import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { Grade, getGradesForSemester } from "../api/getGrades";
import { ScoreRule, getAllRulesForSemester } from "../api/semester";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  grades,
  rules,
}: {
  grades: Grade[];
  rules: ScoreRule[];
}) {
  return (
    <>
      <Head>
        <title>Notas</title>
        <meta
          name="description"
          content="Notas de los alumnos de lenguajes y compiladores"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>Usar /grades.json , /rules.json, /table.csv</main>
    </>
  );
}
