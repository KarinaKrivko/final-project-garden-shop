import React from 'react';
import Catalog from '../../components/Catalog';
import NewSeason from '../../components/NewSeason';
import Sale from '../../components/Sale';
import SalesForm from '../../components/SalesForm';


function MainPage(props) {
    return (
        <>
          <NewSeason />
          <Catalog />
          <SalesForm />
          <Sale />
        </>
    );
}

export default MainPage;