export const CreateObjectURL = (file:File)=> {
	if (!file) {
	  return
  }
  const objectUrl = URL.createObjectURL(file)
  return objectUrl
  }

export const getBase64 = (file:File) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
  }