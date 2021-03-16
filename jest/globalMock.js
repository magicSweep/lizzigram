global.AbortController = jest.fn();

// FORM_DATA
class FormData {
  data = new Map();
  append = (id, data) => {
    this.data.set(id, data);
  };
}

global.FormData = FormData;
