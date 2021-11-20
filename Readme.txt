
## local run
gulp default

## Deploy to prod

```bash
gulp build
aws s3 sync build s3://amadeo.tech --acl public-read
aws cloudfront create-invalidation --distribution-id EGYCQ9UDLDY8Z --paths '/*'
```
