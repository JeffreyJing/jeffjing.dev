# === Form Feedback Lambda ===
resource "aws_lambda_function" "form_handler" {
  function_name = "jjingdev-site-feedback-handler"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "form_handler.lambda_handler"
  runtime       = "python3.12"
  filename      = "${path.module}/../etc/form_lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/../etc/form_lambda.zip")

  environment {
    variables = {
      BUCKET_NAME = aws_s3_bucket.form_data.bucket
      FILE_KEY    = "submissions.jsonl"
    }
  }

  timeout = 10
}

resource "aws_lambda_permission" "form_apigw_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.form_handler.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.form_api.execution_arn}/*/*"
}

# === LLM Recruiter Chat Lambda ===
resource "aws_lambda_function" "llm_handler" {
  function_name = "llm-handler-v5"
  handler       = "llm_handler.handler"
  runtime       = "python3.11"
  role          = aws_iam_role.lambda_exec.arn

  filename         = "${path.module}/../etc/llm_lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/../etc/llm_lambda.zip")

  environment {
    variables = {
      OPENAI_API_KEY = var.openai_api_key
    }
  }

  timeout = 10
}
