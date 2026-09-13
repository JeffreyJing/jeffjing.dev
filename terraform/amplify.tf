resource "aws_amplify_app" "jeffjing" {
  name       = "jeffjing-dev"
  repository = "https://github.com/JeffreyJing/jeffjing.dev"
  oauth_token = var.github_token

  build_spec = <<YAML
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd site
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: site/dist
    files:
      - '**/*'
  cache:
    paths:
      - site/node_modules/**/*
YAML

  # SPA fallback: React Router handles routing client-side, so a direct
  # request or hard refresh on a nested path (e.g. /about) needs to be
  # rewritten to index.html instead of 404ing. Excludes actual static
  # assets (anything with a file extension) so those still serve directly.
  custom_rule {
    source = "</^[^.]+$|\\.(?!(css|gif|ico|jpg|jpeg|js|json|png|svg|txt|webp|woff|woff2|map)$)([^.]+$)/>"
    target = "/index.html"
    status = "200"
  }
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.jeffjing.id
  branch_name = "main"
}

resource "aws_amplify_domain_association" "custom_domain" {
  app_id      = aws_amplify_app.jeffjing.id
  domain_name = "jeffjing.dev"

  sub_domain {
    branch_name = "main"
    prefix      = ""  # root domain
  }

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www"
  }

}