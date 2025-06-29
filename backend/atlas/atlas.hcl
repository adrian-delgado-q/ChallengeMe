variable "semver" {
  type    = string
  default = "1.0.0"
}

data "external_schema" "prisma" {
  program = [
    "npx",
    "prisma",
    "migrate",
    "diff",
    "--from-empty",
    "--to-schema-datamodel",
    "../prisma/schema.prisma",
    "--script"
  ]
}

data "hcl_schema" "triggers_and_functions" {
  path = "hcl/triggers_and_functions.hcl"
}

data "composite_schema" "prisma-extended" {
  schema {
    url = data.external_schema.prisma.url
  }
  schema {
    url = data.hcl_schema.triggers_and_functions.url
  }
  schema {
    url = "file://sql/partial_unique_indexes.sql"
  }
}


env "supabase" {

  url = getenv("SUPABASE_DB_URL")
  # For local development in Supabase
  # dev = "postgresql://postgres:postgres@localhost:54322/postgres?sslmode=disable"
  dev = "docker://postgres/16/dev"
  src = data.composite_schema.prisma-extended.url
  migration {
    dir     = "file://migrations/${var.semver}"
    exclude = ["_prisma_migrations"]
  }
  lint {
    review = ALWAYS
    destructive {
      error = false
    }
  }
}