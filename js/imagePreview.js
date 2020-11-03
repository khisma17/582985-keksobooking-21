'use strict';

(() => {
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  const getImagePreview = (input, preview) => {
    input.addEventListener(`change`, () => {
      const file = input.files[0];
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((extension) => {
        return fileName.endsWith(extension);
      });

      if (matches) {
        const reader = new FileReader();

        reader.addEventListener(`load`, () => {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  window.imagePreview = {getImagePreview};
})();
