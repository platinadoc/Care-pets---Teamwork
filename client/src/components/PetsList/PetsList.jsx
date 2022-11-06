import s from './PetsList.module.scss';
import photoPet from '../../images/testNotice.jpg';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPets } from '../../redux/user/userSelectrors';

import { delPetInUserCard } from '../../redux/user/userOperations';

const PetsList = () => {
  const dispatch = useDispatch();
  const petsList = useSelector(getUserPets);

  // console.log(petsList);

  // useEffect(() => {
  //   dispatch(getUserPets());
  // }, []);

  return (
    <>
      <ul className={s.list}>
        {petsList.length > 0 &&
          petsList.map(pet => (
            <li key={pet._id} className={s.card}>
              <img
                src={`https://pet-support.herokuapp.com/${pet.imgURL}`}
                alt="Pet Foto"
                className={s.petFoto}
              />
              <div className={s.cardDiscription}>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(delPetInUserCard(pet._id));
                  }}
                  className={s.btnDelete}
                >
                  <svg
                    className={s.iconDelete}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path d="M10.5 4.5h3a1.5 1.5 0 1 0-3 0ZM9 4.5a3 3 0 1 1 6 0h6A.75.75 0 1 1 21 6h-.846l-1.808 13.257a3.75 3.75 0 0 1-3.715 3.243H9.369a3.75 3.75 0 0 1-3.715-3.243L3.846 6H3a.75.75 0 0 1 0-1.5h6Zm1.5 5.25a.75.75 0 1 0-1.5 0v7.5a.75.75 0 1 0 1.5 0v-7.5ZM14.25 9a.75.75 0 0 0-.75.75v7.5a.75.75 0 1 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75Z" />
                  </svg>
                </button>
                <p className={s.categoryDiscription}>Name: {pet.name}</p>
                <p className={s.categoryDiscription}>
                  Date of birth: {pet.dateBidthday}
                </p>
                <p className={s.categoryDiscription}>Breed: {pet.breed}</p>
                <p className={s.categoryDiscription}>Comments:{pet.comments}</p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default PetsList;

{
  /* <li className={s.card}>
          <img src={photoPet} alt="Pet Foto" className={s.petFoto} />
          <div className={s.cardDiscription}>
            <button type="button" className={s.btnDelete}>
              <svg
                className={s.iconDelete}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
              >
                <path d="M10.5 4.5h3a1.5 1.5 0 1 0-3 0ZM9 4.5a3 3 0 1 1 6 0h6A.75.75 0 1 1 21 6h-.846l-1.808 13.257a3.75 3.75 0 0 1-3.715 3.243H9.369a3.75 3.75 0 0 1-3.715-3.243L3.846 6H3a.75.75 0 0 1 0-1.5h6Zm1.5 5.25a.75.75 0 1 0-1.5 0v7.5a.75.75 0 1 0 1.5 0v-7.5ZM14.25 9a.75.75 0 0 0-.75.75v7.5a.75.75 0 1 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75Z" />
              </svg>
            </button>
            <p className={s.categoryDiscription}>Name: Bob</p>
            <p className={s.categoryDiscription}>Date of birth: 03.06</p>
            <p className={s.categoryDiscription}>Breed: qwerty</p>
            <p className={s.categoryDiscription}>
              Comments: Ist der Liebling gesund und munter, so haben auch
              alle ihre Freude an den 
              Hausgenossen. Freue Dich nun doppelt und spare mühevolle
              Großeinkäufe: Wir liefern Tierfutter und Tierzubehör kostenlos zu
              Dir an die Haustür – in ganz Deutschland
            </p>
          </div>
        </li> */
}
