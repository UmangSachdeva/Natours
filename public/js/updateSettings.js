import { showAlert } from './alert';

// updateData
// type is either password or data
export const updateSettings = async (data, type) => {
  try {
    console.log(data);
    const url =
      type === 'password'
        ? 'http://localhost:3000/api/v1/users/updatePassword'
        : 'http://localhost:3000/api/v1/users/updateMe';
    const res = await axios({
      url,
      method: 'PATCH',
      data,
    });

    if (res.data.status === 'success') {
      console.log(res.data);
      showAlert('success', `${type.toUpperCase()} Updated Successfully'`);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
