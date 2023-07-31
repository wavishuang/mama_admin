import { ref } from '@vue/reactivity'

export function useImgUpload() {
  const file = ref()
  const imagePreviews = ref([])

  const preview = (e) => {
    imagePreviews.value = []
    for (let file of e.target.files) {
      imagePreviews.value.push(URL.createObjectURL(file))
    }
  }

  const del_imgs = () => {
    if(imagePreviews.value.length) imagePreviews.value = []
  }

  return {
    file, preview, imagePreviews, del_imgs
  }
}