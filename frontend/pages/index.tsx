import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Dapp from "../components/Dapp";
const Home: NextPage = () => {
  return (
    <>
      <Dapp />
    </>
  );
};

export default Home;
