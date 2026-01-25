import { FC, useState } from 'react';
import Hero from '../components/Hero';
import Intro from '../components/Intro';

import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import WelcomeBlock from '../components/WelcomeBlock';
import Locations from '../components/Location';

import '../App.scss';
import ModalBooking from '../components/ModalBooking';

export const HomePage: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
     <>
      <Hero setIsOpen={setIsOpen} />
      <Intro />
      <WelcomeBlock />
      <Locations/>
      <Testimonials />
      <Footer />
      <ModalBooking isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
