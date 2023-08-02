import { ref } from 'vue'

export function useImgUpload() {
  const file = ref(null)
  const imagePreviews = ref([])

  const preview = (e) => {
    imagePreviews.value = []
    for (let file of e.target.files) {
      imagePreviews.value.push(URL.createObjectURL(file))
    }
  }

  const deleteImages = () => {
    if(imagePreviews.value.length) imagePreviews.value = []
  }

  return {
    file, preview, imagePreviews, deleteImages
  }
}