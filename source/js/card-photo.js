const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const AVATAR_DEFAULT_IMAGE = 'img/muffin-grey.svg';

const avatarFileChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoFileChooser = document.querySelector('.ad-form__input');
const photoPreview = document.querySelector('.ad-form__photo');


const displayPreviewImage = (uploadField, previewField) => {
  const file = uploadField.files[0];
  const fileName = file.name.toLowerCase();

  const isValidExtension = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (isValidExtension) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewField.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const imageLoadHandler = () => {
  const newImagePreview = document.createElement('img');
  newImagePreview.width = photoPreview.offsetWidth;
  newImagePreview.height = photoPreview.offsetHeight;
  newImagePreview.alt = 'Фотография жилья в аренду';
  photoPreview.innerHTML = '';
  photoPreview.append(newImagePreview);
  displayPreviewImage(photoFileChooser, newImagePreview);
};

avatarFileChooser.addEventListener('change', () => displayPreviewImage(avatarFileChooser, avatarPreview));

photoFileChooser.addEventListener('change', imageLoadHandler);

const resetImagePreview = () => {
  avatarPreview.src = AVATAR_DEFAULT_IMAGE;
  photoPreview.innerHTML = '';
};

export {resetImagePreview};
