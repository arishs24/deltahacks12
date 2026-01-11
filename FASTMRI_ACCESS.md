# FastMRI Dataset Access

## Important: Access Required

The fastMRI dataset requires **registration and access approval** before downloading.

### Access Steps

1. **Register at fastMRI website**:
   - Visit: https://fastmri.med.nyu.edu/
   - Click "Get Started" or "Request Access"
   - Fill out the registration form
   - Wait for approval (usually within a few days)

2. **After approval**:
   - You'll receive access credentials
   - The S3 bucket URLs may require authentication
   - You may need to use AWS CLI with credentials

### Alternative: Manual Download

If automated download fails:

1. **Download from fastMRI website**:
   - Log in to https://fastmri.med.nyu.edu/
   - Navigate to the dataset download page
   - Download `knee_DICOMs_batch1.tar.xz` and `knee_DICOMs_batch2.tar.xz` manually

2. **Place files in**:
   ```
   data/fastmri_knee/raw/
   ```

3. **Then extract**:
   ```bash
   python scripts/download_fastmri.py --extract --organize
   ```

### Using AWS CLI (If You Have Credentials)

If you have AWS credentials for fastMRI:

```bash
# Configure AWS CLI
aws configure

# Download using AWS CLI
aws s3 cp s3://fastmri-dataset/v2.0/knee_DICOMs_batch1.tar.xz data/fastmri_knee/raw/
aws s3 cp s3://fastmri-dataset/v2.0/knee_DICOMs_batch2.tar.xz data/fastmri_knee/raw/
```

### Troubleshooting

**Error: "Access Denied"**
- You need to register and get approved first
- The public URLs may not work without authentication

**Error: "File too small" or "XML error page"**
- The download got an error page instead of the file
- This means access is denied - register first

**Error: "not an lzma file"**
- The file is corrupted or incomplete
- Re-download the file
- Check file size (should be several GB)

### Current Status

The automated download script will detect if you get an error page and provide helpful messages. However, **you must register with fastMRI first** to get access to the dataset.
