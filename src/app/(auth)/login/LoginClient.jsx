'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import LogoPath from '@/assets/colorful.svg';

import styles from './Auth.module.scss';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader/Loader';

const LoginClient = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthLogin, setIsAuthLogin] = useState(false);

  const router = useRouter();

  const redirectUser = () => {
    // router.push('/');
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLogin(true);
  };

  const signInWithGoogle = async () => {};
  return (
    <>
      <Loader />
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <Image src={LogoPath} priority alt="logo" />
          </h1>
          <form onSubmit={loginUser} className={styles.form}>
            Input
            <div className={styles.group}>자동 로그인, 비밀번호 수정</div>
            <div className={styles.buttonGroup}>
              Button
              <div>Button</div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginClient;
