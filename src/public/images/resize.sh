echo $images
for image in *.{jpg,JPG};
do
W=$(identify -format "%w" "$image")
H=$(identify -format "%h" "$image")
echo $image $W $H
if [ $W -lt $H ];
then
convert "${image}" -gravity center -crop ${W}x${W}+0+0 +repage cropped_"${image}"
else 
convert "${image}" -gravity center -crop ${H}x${H}+0+0 +repage cropped_"${image}"
fi
done
