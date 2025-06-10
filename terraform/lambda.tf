# lambda.tf
resource "aws_lambda_function" "form_handler" {
  function_name = "jjingdev-site-feedback-handler"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "handler.lambda_handler"
  runtime       = "python3.12"
  filename      = "${path.module}/../lambda.zip"

  environment {
    variables = {
      BUCKET_NAME = aws_s3_bucket.form_data.bucket
      FILE_KEY    = "submissions.jsonl"
    }
  }
}

resource "aws_lambda_permission" "apigw_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.form_handler.arn
  principal     = "apigateway.amazonaws.com"
  source_arn = "${aws_api_gateway_rest_api.form_api.execution_arn}/*/*"
}