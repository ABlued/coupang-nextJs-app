'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import LogoPath from '@/src/assets/colorful.svg';

import styles from './Auth.module.scss';
import { useRouter } from 'next/navigation';
import Loader from '@/src/components/loader/Loader';
import Input from '@/src/components/Input/Input';
import AutoSignInCheckbox from '@/src/components/autoSignInCheckbox/AutoSignInCheckbox';
import Divider from '@/src/components/divider/Divider';
import Button from '@/src/components/button/Button';
import Link from 'next/link';
import { toast } from 'react-toastify';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/src/firebase/firebase';
const LoginClient = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthLogin, setIsAuthLogin] = useState(false);

  const router = useRouter();

  const redirectUser = () => {
    router.push('/');
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        toast.success('로그인에 성공했습니다.');
        redirectUser();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error('로그인에 실패했습니다.');

        console.log(errorCode, errorMessage);
        setIsLoading(false);
        toast.error(errorMessage);
      });
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success('로그인에 성공했습니다.');
        redirectUser();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error('로그인에 실패했습니다.');
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
          <form onSubmit={loginUser} className={styles.form}>
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
            <div className={styles.group}>
              <AutoSignInCheckbox
                checked={isAuthLogin}
                onChange={() => setIsAuthLogin(!isAuthLogin)}
              >
                {'자동 로그인'}
              </AutoSignInCheckbox>
              <Link href={'/reset'} className={styles.findLink}>
                비밀번호 수정하기
                <svg
                  width="11"
                  height="18"
                  viewBox="0 0 11 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.findLinkArrow}
                >
                  <path
                    d="M1.5 1L9.5 9L1.5 17"
                    stroke="#0074E9"
                    strokeWidth="2"
                  />
                </svg>
              </Link>
            </div>
            <div className={styles.buttonGroup}>
              <Button type="submit" width="100%">
                로그인
              </Button>
              <Divider />
              <Button width="100%" secondary>
                <Link href={'/register'}>회원가입</Link>
              </Button>
              <Divider />
              <div>
                <Button onClick={signInWithGoogle}>구글 로그인 </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginClient;
