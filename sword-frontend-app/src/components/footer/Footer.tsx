import clsx from 'clsx';
import React, { ForwardedRef } from 'react';
import fb from '../../assets/images/facebook.svg';
import twitter from '../../assets/images/instagram.svg';
import insta from '../../assets/images/twitter.svg';
import send from '../../assets/images/send.svg';
import './Footer.css';

const Footer: React.FC = () => (
  <footer className="footer">
    <div>
      <p className="footer-about">About Page</p>
      <p>Play tic tac toe anytime!</p>
      <p>Created by João Pedro Furriel</p>
    </div>
    <div>
      <p className="footer-contacts">Contacts</p>
      <address>
        <a className="footer-tel" href="tel:+351916492776">(+351) 916 492 776</a>
        <p className="footer-addr">Rua Sá da Bandeira 111, Porto</p>
      </address>
    </div>
    <div>
      <p className="footer-social">Stay in touch</p>
      <ul className="footer-social-list">
        <li><a href="/"><img src={fb} alt="facebook" /></a></li>
        <li><a href="/"><img src={twitter} alt="facebook" /></a></li>
        <li><a href="/"><img src={insta} alt="facebook" /></a></li>
      </ul>
      <div className="footer-subscribe">
        <input id="subscribe" aria-label="subscribe" type="text" />
        <button type="button">
          <img src={send} alt="subscribe" />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
