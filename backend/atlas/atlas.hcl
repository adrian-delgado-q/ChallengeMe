data "hcl_schema" "triggers" {
  path = "atlas/trigger_schema.hcl"
}

data "external_schema" "prisma" {
  program = [
    "npx",
    "prisma",
    "migrate",
    "diff",
    "--from-empty",
    "--to-schema-datamodel",
    "prisma/schema.prisma",
    "--script"
  ]
}

data "composite_schema" "merged" {
  schema "public" {
    url = data.external_schema.prisma.url
  }
  schema "public" {
    url = data.hcl_schema.triggers.url
  }
}

env "supabase" {
  url = getenv("SUPABASE_DB_URL")
  dev = "docker://postgres/16/dev?search_path=public,auth"
  src = data.composite_schema.merged.url
  migration {
    dir     = "file://atlas/migrations"
    exclude = ["_prisma_migrations"]
  }
}