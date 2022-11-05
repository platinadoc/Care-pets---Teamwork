import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import sprite from '../../images/icons/sprite.svg';
import s from './ModalAddNotice.module.scss';

const portalModal = document.querySelector('#modal-root');

const ModalAddNotice = ({ setShowModal }) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') setShowModal(false);
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) setShowModal(false);
  };

  const onBtnCloseClick = () => {
    setShowModal(false);
  };

  const formik = useFormik({
    initialValues: {
      category: 'sell',
      title: '',
      name: '',
      date: '',
      breed: '',
      sex: 'male',
      location: '',
      price: '',
      comments: '',
    },

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },

    validationSchema: Yup.object({
      category: Yup.string().required('This is a required field'),
      title: Yup.string()
        .min(2, 'Field must include more tnan 2 characters')
        .max(48, 'Field must include less tnan 48 characters')
        .required('This is a required field'),
      name: Yup.string()
        .min(2, 'Field must include more tnan 2 characters')
        .max(16, 'Field must be less tnan 16 characters'),
      date: Yup.date().max(new Date(), 'Choose date in the past'),
      breed: Yup.string()
        .min(2, 'Field must include more tnan 2 characters')
        .max(24, 'Field must be less tnan 24 characters'),
      sex: Yup.string().required('This is a required field'),
      location: Yup.string()
        .min(2, 'Field must include more tnan 2 characters')
        .max(24, 'Field must be less tnan 24 characters')
        .required('This is a required field'),
      price: Yup.number()
        .typeError('Enter the number')
        .integer('Only integer numbers')
        .required('This is a required field'),
      comments: Yup.string()
        .min(8, 'Field must include more tnan 8 characters')
        .max(120, 'Field must be less tnan 120 characters'),
    }),
  });

  const { category, title, name, date, breed, sex, location, price, comments } =
    formik.values;

  const {
    title: titleError,
    name: nameError,
    date: dateError,
    breed: breedError,
    location: locationError,
    price: priceError,
    comments: commentsError,
  } = formik.errors;

  const onPageChange = () => {
    if (page === 1) {
      console.log(category);
      setPage(2);
      return;
    }
    setPage(1);
  };

  return createPortal(
    <div className={s.backdrop} onClick={onBackdropClick}>
      <div className={s.modal}>
        <button type="button" className={s.btnClose} onClick={onBtnCloseClick}>
          <svg
            className={s.iconClose}
            aria-label="Close modal"
            width="16"
            height="16"
          >
            <use href={sprite + '#close-icon'} />
          </svg>
        </button>
        <h2 className={s.title}>Add pet</h2>
        {page === 1 && (
          <p className={s.descr}>
            Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
            consectetur
          </p>
        )}
        <form>
          {page === 1 && (
            <>
              <div className={s.radioToolbar}>
                {category === 'lostFound' ? (
                  <label
                    style={{ backgroundColor: '#F59256', color: '#ffffff' }}
                    className={s.radioLabel}
                  >
                    lost/found
                    <input
                      type="radio"
                      id="radio1"
                      name="category"
                      value="lostFound"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                ) : (
                  <label className={s.radioLabel}>
                    lost/found
                    <input
                      type="radio"
                      id="radio1"
                      name="category"
                      value="lostFound"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                )}
                {category === 'inGoodHands' ? (
                  <label
                    style={{ backgroundColor: '#F59256', color: '#ffffff' }}
                  >
                    {' '}
                    In good hands
                    <input
                      type="radio"
                      id="radio2"
                      name="category"
                      value="inGoodHands"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                ) : (
                  <label>
                    In good hands
                    <input
                      type="radio"
                      id="radio2"
                      name="category"
                      value="inGoodHands"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                )}
                {category === 'sell' ? (
                  <label
                    style={{ backgroundColor: '#F59256', color: '#ffffff' }}
                  >
                    Sell
                    <input
                      type="radio"
                      id="radio3"
                      name="category"
                      value="sell"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                ) : (
                  <label>
                    Sell
                    <input
                      type="radio"
                      id="radio3"
                      name="category"
                      value="sell"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                )}
              </div>
              <label forhtml="title" className={s.label}>
                Tittle of ad<span className={s.accent}>*</span>
              </label>
              <input
                className={s.input}
                type="text"
                name="title"
                id="title"
                placeholder="Type name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={title}
              />
              <p className={s.error}>
                {formik.touched.title && titleError && titleError}
              </p>
              <label forhtml="name" className={s.label}>
                Name pet
              </label>
              <input
                className={s.input}
                type="text"
                name="name"
                id="name"
                placeholder="Type name pet"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={name}
              />
              <p className={s.error}>
                {formik.touched.name && nameError && nameError}
              </p>
              <label forhtml="date" className={s.label}>
                Date of birth
              </label>
              <input
                className={s.input}
                type="date"
                name="date"
                id="date"
                placeholder="Type date of birth"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={date}
              />
              <p className={s.error}>
                {formik.touched.date && dateError && dateError}
              </p>
              <label forhtml="breed" className={s.label}>
                Breed
              </label>
              <input
                className={s.input}
                type="text"
                name="breed"
                id="breed"
                placeholder="Type breed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={breed}
              />
              <p className={s['error--last']}>
                {formik.touched.breed && breedError && breedError}
              </p>
              <div className={s.blockOfButtons}>
                <button
                  className={`${s.button} ${s.buttonDistance}`}
                  type="button"
                  onClick={onBtnCloseClick}
                >
                  Cancel
                </button>
                <button
                  className={s.button}
                  type="button"
                  onClick={onPageChange}
                  disabled={
                    title === '' ||
                    titleError ||
                    nameError ||
                    dateError ||
                    breedError
                      ? true
                      : false
                  }
                >
                  Next
                </button>
              </div>
            </>
          )}
          {page === 2 && (
            <>
              <div className={s.radioToolbarPage2}>
                <p className={`${s.label} ${s.labelSexDistance}`}>
                  The sex<span className={s.accent}>*</span>:
                </p>
                <div className={s.blockOfRadio}>
                  <label className={s.labelMale}>
                    <input
                      type="radio"
                      name="sex"
                      value="male"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {sex === 'male' ? (
                      <span style={{ color: '#F59256' }} className={s.sexDescr}>
                        Male
                      </span>
                    ) : (
                      <span style={{ color: '#111111' }} className={s.sexDescr}>
                        Male
                      </span>
                    )}
                  </label>
                  <label className={s.labelFemale}>
                    <input
                      type="radio"
                      name="sex"
                      value="female"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {sex === 'female' ? (
                      <span style={{ color: '#F59256' }} className={s.sexDescr}>
                        Female
                      </span>
                    ) : (
                      <span style={{ color: '#111111' }} className={s.sexDescr}>
                        Female
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <label forhtml="location" className={s.label}>
                Location<span className={s.accent}>*</span>:
              </label>
              <input
                className={s.input}
                type="text"
                name="location"
                id="location"
                placeholder="Type location"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={location}
              />
              <p className={s.error}>
                {formik.touched.location && locationError && locationError}
              </p>
              {category === 'sell' && (
                <>
                  <label forhtml="price" className={s.label}>
                    Price<span className={s.accent}>*</span>:
                  </label>
                  <input
                    className={s.input}
                    type="text"
                    name="price"
                    id="price"
                    placeholder="Type price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={price}
                  />
                  <p className={s.error}>
                    {formik.touched.price && priceError && priceError}
                  </p>
                </>
              )}
              <label forhtml="comments" className={s.label}>
                Comments
              </label>
              <textarea
                className={s.textarea}
                name="comments"
                id="comments"
                placeholder="Type comments"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={comments}
              ></textarea>
              <p className={s['error--last']}>
                {formik.touched.comments && commentsError && commentsError}
              </p>
              <div className={s.blockOfButtons}>
                <button
                  className={`${s.button} ${s.buttonDistance}`}
                  type="button"
                  onClick={onPageChange}
                >
                  Back
                </button>
                <button
                  className={s.button}
                  type="submit"
                  onClick={onBtnCloseClick}
                  disabled={
                    location === '' ||
                    price === '' ||
                    locationError ||
                    priceError ||
                    commentsError
                      ? true
                      : false
                  }
                >
                  Done
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>,
    portalModal
  );
};

export default ModalAddNotice;
