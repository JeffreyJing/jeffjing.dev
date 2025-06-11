resource "aws_s3_bucket" "form_data" {
  bucket = "jeffjing-form-submissions"
  force_destroy = true
}
