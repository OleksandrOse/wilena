import { FC, useState } from 'react';
import Hero from '../components/Hero';
import Intro from '../components/Intro';

import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import WelcomeBlock from '../components/WelcomeBlock';
import Locations from '../components/Location';

import '../App.scss';
import ModalBooking from '../components/ModalBooking';
import HeroVillach from '../components/HeroVillach';
import AboutVillach from '../components/AboutVillach';
import BenefitsVillach from '../components/BenefitsVillach';
import Gallery from '../components/Gallery';
import RoomsSliderVillach from '../components/RoomSliderVillach';
import RoomsVillach from '../components/RoomsVilach';
import SeasonsVillach from '../components/SeasonsVillach';
import Contact from '../components/Contact';

export const VillachPage: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HeroVillach />
      <AboutVillach />
      <BenefitsVillach />
      <Gallery />
      <RoomsSliderVillach />
      <RoomsVillach />
      <SeasonsVillach />
      <Contact />
    </>
  );
};
