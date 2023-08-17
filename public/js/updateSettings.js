import { showAlert } from './alert';

// updateData
// type is either password or data
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updatePassword'
        : '/api/v1/users/updateMe';
    const res = await axios({
      url,
      method: 'PATCH',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} Updated Successfully'`);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
