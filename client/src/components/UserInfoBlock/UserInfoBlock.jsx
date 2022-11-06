import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploading from 'react-images-uploading';
import { getAllUserInfo } from '../../redux/user/userSelectrors';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import s from './UserInfoBlock.module.scss';
import { pathInfoUser } from 'redux/user/userOperations';
import sprite from '../../images/icons/sprite.svg';

/* ----------REGEX--------------- */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+380\d{9}/;
const cityRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{3,32},(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{3,32}$/;

const UserInfoBlock = () => {
  /* Селекторы */
  const userInfo = useSelector(getAllUserInfo);

  /* UseState */
  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  /* Это для загрузки файла */
  const [selectedFile, setSelectedFile] = useState();

  const dispatch = useDispatch();
  const listRef = useRef();

  /* Возможно тут можно обрабатывать ошибки типо нотификашку высвечивать */
  useEffect(() => {
    if (userInfo.error) {
      Notify.failure(userInfo.error);
    }
  }, [userInfo.error]);

  /* Записуем в стейт данные при загрузки страницы из селектора */
  useEffect(() => {
    setPhoto(userInfo.avatarURL);
    setEmail(userInfo.email);
    setName(userInfo.name);
    setCity(userInfo.city);
    setPhone(userInfo.phone);
    setBirthday(userInfo.birthday);
  }, [userInfo]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      //   setPreview(undefined);
      return;
    }

    /* Создаем виртуальную ссылку на загруженный файл */
    const objectUrl = URL.createObjectURL(selectedFile);
    setPhoto(objectUrl);

    /* Создаем FormData и добовляем туда наш файл и отпарвляем */
    const bodyFormData = new FormData();
    bodyFormData.append('avatar', selectedFile);
    dispatch(pathInfoUser(bodyFormData));

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  /* При клике на кнопку меняем disabled class отправлем на бек форму */
  const handleClick = e => {
    const btn = e.target;
    const listChildren = Object.values(listRef.current.children);

    listChildren.forEach(li => {
      const input = li.children['1'];
      if (input.name === btn.name) {
        if (input.disabled) {
          /* Меняем инпут дизейблид */
          input.disabled = false;
          /* Меняем класс кнопки */
          btn.className = 'galochka';
          return;
        }
        if (!input.disabled) {
          if (btn.name === 'name') {
            if (name.length < 2) {
              return Notify.failure('min length "name" 2');
            }
            if (name.length > 10) {
              return Notify.failure('max length "name" 10');
            }
            dispatch(pathInfoUser({ name }));
          }
          if (btn.name === 'email') {
            if (email.length < 6) {
              return Notify.failure('min length "email" 6');
            }
            if (email.length > 25) {
              return Notify.failure('max length "email" 25');
            }
            if (!emailRegex.exec(email)) {
              /* REGEX надо провалидировать */
              return Notify.failure('Wrong format!');
            }
            dispatch(pathInfoUser({ email }));
          }
          if (btn.name === 'birthday') {
            /* Надо придумать валидацию */
            dispatch(pathInfoUser({ birthday }));
          }
          if (btn.name === 'phone') {
            if (phone.length !== 13) {
              return Notify.failure('length "phone" 13');
            }
            if (!phoneRegex.exec(phone)) {
              /* REGEX надо провалидировать */
              return Notify.failure('Wrong format! +380...');
            }
            dispatch(pathInfoUser({ phone }));
          }
          if (btn.name === 'city') {
            if (!cityRegex.exec(city)) {
              /* REGEX надо провалидировать */
              return Notify.failure('Wrong format!');
            }
            dispatch(pathInfoUser({ city }));
          }

          /* Меняем класс кнопки */
          btn.className = 'pencil';
          /* Меняем инпут дизейблид */
          input.disabled = true;
          return;
        }
      }
    });
  };

  /* Для выбора файла  */
  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      // setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className={s.infoWrapper}>
      <div className={s.avatarWrapper}>
        <img src={photo} alt="avatar" width={200} height={200} className={s.avatar} />
        <label className={s.avatarInputFile}>
          <svg className={s.iconInputFile}>
            <use href={sprite + '#camera-icon'} />
          </svg>
          Edit photo
          <input
            type="file"
            name="avatar"
            accept=".png, .jpg, .jpeg"
            onChange={onSelectFile}
            className={s.avatarInput}
            placeholder="Edit photo"
          />
        </label>
      </div>
      <ul ref={listRef} className={s.list}>
        <li className={s.item}>
          <p className={s.item__title}>Name:</p>
          <input
            type="text"
            name="name"
            disabled={true}
            onChange={e => setName(e.target.value)}
            value={name}
            className={s.item__input}
          />
          <button type="button" name="name" className={'pencil'} onClick={handleClick}></button>
        </li>
        <li className={s.item}>
          <p className={s.item__title}>Email:</p>
          <input
            type="text"
            name="email"
            disabled={true}
            onChange={e => setEmail(e.target.value)}
            value={email}
            className={s.item__input}
          />
          <button type="button" name="email" className={'pencil'} onClick={handleClick}></button>
        </li>
        <li className={s.item}>
          <p className={s.item__title}>Birthday:</p>
          <input
            type="date"
            name="birthday"
            disabled={true}
            onChange={e => setBirthday(e.target.value)}
            value={birthday}
            className={s.item__input}
          />
          <button type="button" name="birthday" className={'pencil'} onClick={handleClick}></button>
        </li>
        <li className={s.item}>
          <p className={s.item__title}>Phone:</p>
          <input
            type="text"
            name="phone"
            disabled={true}
            onChange={e => setPhone(e.target.value)}
            value={phone}
            className={s.item__input}
          />
          <button type="button" name="phone" className={'pencil'} onClick={handleClick}></button>
        </li>
        <li className={s.item}>
          <p className={s.item__title}>City:</p>
          <input
            type="text"
            name="city"
            disabled={true}
            onChange={e => setCity(e.target.value)}
            value={city}
            className={s.item__input}
          />
          <button type="button" name="city" className={'pencil'} onClick={handleClick}></button>
        </li>
      </ul>
    </div>
  );
};

export default UserInfoBlock;