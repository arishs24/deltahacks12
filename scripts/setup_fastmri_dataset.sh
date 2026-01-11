#!/bin/bash
# Shell script to download fastMRI knee DICOM dataset using curl
# Alternative to Python download script

set -e  # Exit on error

OUTPUT_DIR="${1:-data}"
BATCHES="${2:-1 2}"

echo "=========================================="
echo "FASTMRI KNEE DATASET DOWNLOAD"
echo "=========================================="
echo "Output directory: $OUTPUT_DIR"
echo "Batches: $BATCHES"
echo ""

# Create directory structure
mkdir -p "$OUTPUT_DIR/fastmri_knee/raw"
RAW_DIR="$OUTPUT_DIR/fastmri_knee/raw"

# Download batches
for batch in $BATCHES; do
    FILENAME="knee_DICOMs_batch${batch}.tar.xz"
    URL="https://fastmri-dataset.s3.amazonaws.com/v2.0/${FILENAME}"
    OUTPUT="$RAW_DIR/$FILENAME"
    
    echo "Downloading batch $batch..."
    echo "URL: $URL"
    echo "Output: $OUTPUT"
    
    if [ -f "$OUTPUT" ]; then
        echo "File already exists: $OUTPUT"
        echo "Skipping download. (Delete file to re-download)"
    else
        curl -C - "$URL" --output "$OUTPUT"
        echo "Downloaded: $OUTPUT"
    fi
    echo ""
done

echo "=========================================="
echo "DOWNLOAD COMPLETE"
echo "=========================================="
echo ""
echo "To extract archives, run:"
echo "  python scripts/download_fastmri.py --extract --organize"
echo ""
echo "Or manually extract:"
echo "  cd $RAW_DIR"
echo "  tar -xf knee_DICOMs_batch1.tar.xz"
echo "  tar -xf knee_DICOMs_batch2.tar.xz"
