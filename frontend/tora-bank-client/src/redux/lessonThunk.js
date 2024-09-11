
import { setDataFilter } from './lessonSlice';
import { GetAllCategory, GetAllType } from '../utils/lookUpUtil';
import { GetAllRabaies} from '../utils/userUtil';

// export const fetchCategories = () => async (dispatch) => {
//   try {
//     const res = await GetAllCategory();
//     dispatch(setDataFilter({ categories: res }));
//   } catch (error) {
//     console.error('Failed to fetch categories:', error);
//     dispatch(setDataFilter({ categories: [] }));
//   }
// };

// export const fetchTypes = () => async (dispatch) => {
//   try {
//     const res = await GetAllType();
//     dispatch(setDataFilter({ types: res }));
//   } catch (error) {
//     console.error('Failed to fetch types:', error);
//     dispatch(setDataFilter({ types: [] }));
//   }
// };
// export const fetchRabbaies = () => async (dispatch) => {
//   try {
//     const res = await GetAllRabaies();
//     dispatch(setDataFilter({ rabbaies: res }));
//   } catch (error) {
//     console.error('Failed to fetch rabbaies:', error);
//     dispatch(setDataFilter({ rabbaies: [] }));
//   }
// };