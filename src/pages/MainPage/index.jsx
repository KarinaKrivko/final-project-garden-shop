import React from 'react';
import Catalog from '../../components/Catalog';
import NewSeason from '../../components/NewSeason';
import Sale from '../../components/Sale';
import SalesForm from '../../components/SalesForm';


function MainPage(props) {
    return (
        <div>
          <NewSeason />
          <Catalog />
          <SalesForm />
          <Sale />
        </div>
    );
}

export default MainPage;