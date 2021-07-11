for file in *.{jpg,JPEG,JPG,jpeg,PNG,png}
  do
echo $file
  convert "${file}" -scale 30% gallery_"${file}"
done

