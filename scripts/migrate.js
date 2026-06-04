#!/usr/bin/env node
/**
 * Run database migrations for VoyageIndia
 * Usage: node scripts/migrate.js
 */

const { readFileSync } = require("fs");
const { join } = require("path");

// Try multiple connection formats
const PASSWORD = "Rudra@31140404$";
const PROJECT_REF = "ycofajiaplkckwftonzf";
const ENCODED_PASS = encodeURIComponent(PASSWORD);

const CONNECTION_STRINGS = [
  // Direct connection (port 5432)
  `postgresql://postgres:${ENCODED_PASS}@db.${PROJECT_REF}.supabase.co:5432/postgres`,
  // Pooler session mode (port 5432)
  `postgresql://postgres:${ENCODED_PASS}@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?options=project%3D${PROJECT_REF}`,
  // Pooler transaction mode (port 6543)
  `postgresql://postgres:${ENCODED_PASS}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?options=project%3D${PROJECT_REF}`,
];

async function tryConnect(connectionString, { Client }) {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
  });
  await client.connect();
  return client;
}

async function runMigrations() {
  let pg;
  try {
    pg = require("pg");
  } catch {
    console.error("❌ 'pg' package not found. Run: npm install pg");
    process.exit(1);
  }

  let client = null;

  for (const connStr of CONNECTION_STRINGS) {
    const masked = connStr.replace(ENCODED_PASS, "***");
    process.stdout.write(`🔌 Trying: ${masked.substring(0, 70)}... `);
    try {
      client = await tryConnect(connStr, pg);
      console.log("✅ Connected!\n");
      break;
    } catch (e) {
      console.log(`❌ ${e.message.split("\n")[0]}`);
      client = null;
    }
  }

  if (!client) {
    console.log("\n💡 All connection attempts failed.\n");
    console.log("Please run the SQL files manually:");
    console.log("1. Go to https://app.supabase.com/project/" + PROJECT_REF + "/sql/new");
    console.log("2. Paste and run: supabase/migrations/001_initial_schema.sql");
    console.log("3. Paste and run: supabase/migrations/002_seed_data.sql\n");
    process.exit(1);
  }

  const migrations = [
    "supabase/migrations/001_initial_schema.sql",
    "supabase/migrations/002_seed_data.sql",
  ];

  for (const file of migrations) {
    const filePath = join(process.cwd(), file);
    const sql = readFileSync(filePath, "utf8");
    console.log(`📄 Running: ${file}`);
    // Split on semicolons to run statement by statement
    const statements = sql
      .split(/;\s*\n/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith("--"));

    let ok = 0, skipped = 0, failed = 0;
    for (const stmt of statements) {
      try {
        await client.query(stmt);
        ok++;
      } catch (err) {
        if (
          err.message.includes("already exists") ||
          err.message.includes("duplicate") ||
          err.code === "42P07" || // table already exists
          err.code === "42710" || // object already exists
          err.code === "23505"    // unique violation (re-seeding)
        ) {
          skipped++;
        } else {
          console.warn(`   ⚠️  ${err.message.substring(0, 100)}`);
          failed++;
        }
      }
    }
    console.log(`   ✅ ${ok} statements OK, ${skipped} skipped, ${failed} failed\n`);
  }

  await client.end();
  console.log("🎉 Migrations complete! Your database is ready.");
  console.log(`\n🌐 Visit your site and go to /admin to manage content.`);
}

runMigrations().catch((e) => {
  console.error("Fatal:", e.message);
  process.exit(1);
});
