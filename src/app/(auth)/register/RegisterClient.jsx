'use client';
import Loader from '@/src/components/loader/Loader';
import React, { useState } from 'react';
import styles from '../login/Auth.module.scss';
import Image from 'next/image';
import Input from '@/src/components/Input/Input';
import Button from '@/src/components/button/Button';
import Divider from '@/src/components/divider/Divider';
import { useRouter } from 'next/navigation';
import LogoPath from '@/src/assets/colorful.svg';
import Link from 'next/link';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/src/firebase/firebase';
import { toast } from 'react-toastify';

function RegisterClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      return;
    }

    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success('회원가입이 완료되었습니다.');
        router.push('/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setIsLoading(false);
        toast.error(errorMessage);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <Image src={LogoPath} priority alt="logo" />
          </h1>
          <form onSubmit={registerUser} className={styles.form}>
            <Input
              email
              icon="letter"
              id="email"
              name="email"
              label="이메일"
              placeholder="아이디(이메일)"
              className={styles.control}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              password
              icon="lock"
              id="password"
              name="password"
              label="비밀번호"
              placeholder="비밀번호"
              className={styles.control}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              password
              icon="lock"
              id="cpassword"
              name="cpassword"
              label="비밀번호 확인"
              placeholder="비밀번호 확인"
              className={styles.control}
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <div className={styles.buttonGroup}>
              <Button type="submit" width="100%">
                회원가입
              </Button>
              <Divider />
              <Button width="100%" secondary>
                <Link href={'/login'}>로그인</Link>
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default RegisterClient;
