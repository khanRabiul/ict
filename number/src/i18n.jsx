/* eslint-disable react-refresh/only-export-components */
import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LanguageContext = createContext(null);

const bengaliTranslations = {
  "Number Systems": "সংখ্যা পদ্ধতি",
  "Number Systems home": "সংখ্যা পদ্ধতির হোম",
  "Main navigation": "প্রধান নেভিগেশন",
  "Portrait of Khan Rabiul": "খান রাবিউলের প্রতিকৃতি",
  Counters: "কাউন্টার",
  Converter: "রূপান্তরক",
  Quiz: "কুইজ",
  "Test Skills": "দক্ষতা যাচাই",
  About: "পরিচিতি",
  "Close navigation menu": "নেভিগেশন মেনু বন্ধ করুন",
  "Open navigation menu": "নেভিগেশন মেনু খুলুন",
  "Switch language": "ভাষা পরিবর্তন করুন",
  "Learn by exploring": "অন্বেষণের মাধ্যমে শিখুন",
  "Understand number systems, one digit at a time.": "একটি করে অঙ্কের মাধ্যমে সংখ্যা পদ্ধতি বুঝুন।",
  "Convert numbers, compare Decimal, Octal, Hexadecimal, and Binary, and practice what you learn.": "সংখ্যা রূপান্তর করুন, দশমিক, অক্টাল, হেক্সাডেসিমেল ও বাইনারির তুলনা করুন এবং যা শিখেছেন তা অনুশীলন করুন।",
  "Try the converter": "রূপান্তরক ব্যবহার করুন",
  "Explore counters": "কাউন্টার দেখুন",
  "Number system Counters": "সংখ্যা পদ্ধতির কাউন্টার",
  "Select a number system": "একটি সংখ্যা পদ্ধতি বেছে নিন",
  Decimal: "দশমিক",
  Binary: "বাইনারি",
  Octal: "অক্টাল",
  Hexadecimal: "হেক্সাডেসিমেল",
  "Digits 0–9": "অঙ্ক ০–৯",
  "Digits 0–1": "অঙ্ক ০–১",
  "Base 8": "ভিত্তি ৮",
  "Digits 0–7": "অঙ্ক ০–৭",
  "Digits 0–9, A–F": "অঙ্ক ০–৯, A–F",
  "Convert numbers": "সংখ্যা রূপান্তর",
  "Number System Converter": "সংখ্যা পদ্ধতি রূপান্তরক",
  "Conversion mode": "রূপান্তরের ধরন",
  "Single conversion": "একক রূপান্তর",
  "Multiple conversions": "একাধিক রূপান্তর",
  "Convert from": "যে পদ্ধতি থেকে",
  "Convert to": "যে পদ্ধতিতে",
  "Swap source and target number systems": "উৎস ও গন্তব্য সংখ্যা পদ্ধতি অদলবদল করুন",
  "Swap number systems": "সংখ্যা পদ্ধতি অদলবদল করুন",
  "Answer feedback": "উত্তরের প্রতিক্রিয়া",
  "Number to convert": "রূপান্তরের সংখ্যা",
  "Number to convert (": "রূপান্তরের সংখ্যা (",
  Convert: "রূপান্তর করুন",
  "Hide details": "বিস্তারিত লুকান",
  "How to convert": "রূপান্তরের পদ্ধতি",
  "How to Convert": "রূপান্তরের পদ্ধতি",
  "output": "ফলাফল",
  "Repeating fraction, rounded to 16 fractional digits.": "পুনরাবৃত্ত ভগ্নাংশ; ১৬টি ভগ্নাংশীয় অঙ্ক পর্যন্ত নিকটতম মান দেখানো হয়েছে।",
  "Repeating fractional answers may be entered truncated or rounded to 16 fractional digits.": "পুনরাবৃত্ত ভগ্নাংশের উত্তরে ১৬টি অঙ্ক পর্যন্ত কেটে দেওয়া বা নিকটতম মানে রাউন্ড করা—দুই রূপই গ্রহণযোগ্য।",
  "1. Decimal Place-Value Expansion": "১. দশমিক স্থানীয় মানে বিশ্লেষণ",
  "2. Decimal Result": "২. দশমিক ফলাফল",
  "The decimal value is already in the target number system:": "দশমিক মানটি ইতিমধ্যে গন্তব্য সংখ্যা পদ্ধতিতে রয়েছে:",
  "The decimal value is already the target result:": "দশমিক মানটিই গন্তব্য ফলাফল:",
  "Zero is represented as": "শূন্যকে এভাবে প্রকাশ করা হয়",
  "in every number system.": "সব সংখ্যা পদ্ধতিতে।",
  "Convert the whole-number part by repeated division. Convert the fractional part by repeatedly multiplying its remainder by": "পূর্ণসংখ্যার অংশকে বারবার ভাগ করুন। ভগ্নাংশের অংশের অবশিষ্টাংশকে বারবার গুণ করুন",
  "The integer digits are read bottom to top; the fractional digits are read top to bottom:": "পূর্ণসংখ্যার অঙ্কগুলো নিচ থেকে ওপরে এবং ভগ্নাংশের অঙ্কগুলো ওপর থেকে নিচে পড়ুন:",
  "digit": "অঙ্ক",
  "remainder": "অবশিষ্টাংশ",
  ", digit": ", অঙ্ক",
  ", remainder": ", অবশিষ্টাংশ",
  "Practice": "অনুশীলন",
  "Test Your Skills": "নিজের দক্ষতা যাচাই করুন",
  "Test mode": "পরীক্ষার ধরন",
  "Single test": "একক পরীক্ষা",
  "Multiple tests": "একাধিক পরীক্ষা",
  "Your answer": "আপনার উত্তর",
  "Your answer:": "আপনার উত্তর:",
  "Enter a result for each other number system": "অন্য প্রতিটি সংখ্যা পদ্ধতির ফল লিখুন",
  "Check answer": "উত্তর যাচাই করুন",
  "Check answers": "উত্তরগুলো যাচাই করুন",
  "Congratulations! Your answer is correct.": "অভিনন্দন! আপনার উত্তর সঠিক।",
  "Not quite. Here is the correct answer:": "ঠিক হয়নি। সঠিক উত্তরটি হলো:",
  "Congratulations! All your submitted answers are correct.": "অভিনন্দন! আপনার দেওয়া সব উত্তর সঠিক।",
  "Some answers need another look. Check the results below.": "কিছু উত্তর আবার দেখুন। নিচে ফলাফল দেখুন।",
  "Not quite. Check the correct answer below.": "ঠিক হয়নি। নিচে সঠিক উত্তরটি দেখুন।",
  "Quick quiz": "দ্রুত কুইজ",
  "Number Systems Quiz": "সংখ্যা পদ্ধতির কুইজ",
  "Quiz complete": "কুইজ শেষ",
  "Excellent work! You know your number systems.": "চমৎকার! সংখ্যা পদ্ধতি সম্পর্কে আপনার ভালো জ্ঞান আছে।",
  "Keep practicing and try the quiz again.": "অনুশীলন চালিয়ে যান এবং আবার কুইজ দিন।",
  "Try again": "আবার চেষ্টা করুন",
  "Quiz progress": "কুইজের অগ্রগতি",
  "Choose an answer": "একটি উত্তর বেছে নিন",
  "See results": "ফলাফল দেখুন",
  "Next question": "পরের প্রশ্ন",
  "Correct!": "সঠিক!",
  "About me": "আমার সম্পর্কে",
  "Meet the developer": "ডেভেলপারের পরিচয়",
  "Professional profile": "পেশাগত প্রোফাইল",
  "Developer writing": "ডেভেলপার হিসেবে লেখা",
  "Social profile": "সামাজিক প্রোফাইল",
  "MERN Stack Developer": "MERN স্ট্যাক ডেভেলপার",
  "MERN Stack & Next.js Developer": "MERN স্ট্যাক ও Next.js ডেভেলপার",
  "I build modern web applications with the MERN stack: MongoDB, Express.js, React, and Node.js, as well as Next.js. This number systems project makes learning number conversion interactive and approachable.": "আমি MERN স্ট্যাক—MongoDB, Express.js, React ও Node.js—এবং Next.js দিয়ে আধুনিক ওয়েব অ্যাপ তৈরি করি। এই সংখ্যা পদ্ধতি প্রকল্পটি সংখ্যা রূপান্তর শেখাকে ইন্টারঅ্যাকটিভ ও সহজবোধ্য করে তোলে।",
  "Connect with me": "যোগাযোগ করুন",
  "Rolling animation duration": "ঘূর্ণায়মান অ্যানিমেশনের সময়কাল",
  "Current number": "বর্তমান সংখ্যা",
  "Decimal number": "দশমিক সংখ্যা",
  "Current number {value}": "বর্তমান সংখ্যা {value}",
  "Number systems": "সংখ্যা পদ্ধতি",
  "Counter type": "কাউন্টারের ধরন",
  Counter: "কাউন্টার",
  "number counter": "সংখ্যা কাউন্টার",
  Automatic: "স্বয়ংক্রিয়",
  Manual: "ম্যানুয়াল",
  "Automatic Counter": "স্বয়ংক্রিয় কাউন্টার",
  "Manual Counter": "ম্যানুয়াল কাউন্টার",
  Play: "চালু করুন",
  Pause: "থামান",
  Reset: "রিসেট",
  "Previous −1": "আগেরটি −১",
  "Next +1": "পরেরটি +১",
  "Digits available": "ব্যবহারযোগ্য অঙ্ক",
  "Automatic and manual counting have separate values and controls.": "স্বয়ংক্রিয় ও ম্যানুয়াল গণনার মান এবং নিয়ন্ত্রণ আলাদা।",
  "Status:": "অবস্থা:",
  "Status": "অবস্থা",
  "Your": "আপনার",
  answer: "উত্তর",
  "Your answer (": "আপনার উত্তর (",
  " answer": " উত্তর",
  Base: "ভিত্তি",
  "(base": "(ভিত্তি",
  of: "এর মধ্যে",
  Running: "চলছে",
  Paused: "বিরত",
  " of ": " এর মধ্যে ",
  "Question ": "প্রশ্ন ",
  "Score:": "স্কোর:",
  "Automatic counter": "স্বয়ংক্রিয় কাউন্টার",
  "Manual counter": "ম্যানুয়াল কাউন্টার",
  "Number systems counter": "সংখ্যা পদ্ধতির কাউন্টার",
  "Which digits are used in the binary number system?": "বাইনারি সংখ্যা পদ্ধতিতে কোন অঙ্কগুলো ব্যবহৃত হয়?",
  "0 and 1": "০ এবং ১",
  "0 through 7": "০ থেকে ৭",
  "0 through 9": "০ থেকে ৯",
  "A through F": "A থেকে F",
  "Binary is base 2, so it uses only the digits 0 and 1.": "বাইনারির ভিত্তি ২, তাই এতে শুধু ০ এবং ১ অঙ্ক ব্যবহৃত হয়।",
  "What is the base of the octal number system?": "অক্টাল সংখ্যা পদ্ধতির ভিত্তি কত?",
  "Octal is base 8 and uses digits 0 through 7.": "অক্টালের ভিত্তি ৮ এবং এতে ০ থেকে ৭ পর্যন্ত অঙ্ক ব্যবহৃত হয়।",
  "In hexadecimal, what value does the digit A represent?": "হেক্সাডেসিমেলে A অঙ্কটি কোন মান বোঝায়?",
  "Hexadecimal uses A through F for values 10 through 15.": "হেক্সাডেসিমেলে ১০ থেকে ১৫ মান বোঝাতে A থেকে F ব্যবহৃত হয়।",
  "What is decimal 10 written in binary?": "দশমিক ১০-কে বাইনারিতে কীভাবে লেখা হয়?",
  "10 = 8 + 2, so its binary representation is 1010.": "১০ = ৮ + ২, তাই এর বাইনারি রূপ ১০১০।",
  "Question {current} of {total}": "প্রশ্ন {total}-এর মধ্যে {current}",
  "Score: {score}": "স্কোর: {score}",
  "You scored {score} out of {total}": "{total}-এর মধ্যে আপনার স্কোর {score}",
  "You scored": "আপনার স্কোর",
  "out of": "এর মধ্যে",
  "Wrong digit \"{digit}\" for {system}.": "{system}-এর জন্য \"{digit}\" অঙ্কটি সঠিক নয়।",
  "Enter a number with at most one decimal point and at least one digit after it.": "একটি সংখ্যা লিখুন; একটির বেশি দশমিক বিন্দু নয় এবং বিন্দুর পরে অন্তত একটি অঙ্ক থাকতে হবে।",
  "How to Convert {source} to {target}": "{source} থেকে {target} রূপান্তরের পদ্ধতি",
  "1. Convert {source} to Decimal": "১. {source} থেকে দশমিকে রূপান্তর",
  "2. Convert Decimal to {target}": "২. দশমিক থেকে {target} রূপান্তর",
  "{system} (base {base})": "{system} (ভিত্তি {base})",
  "Enter {system} digits, e.g. {example}": "{system} সংখ্যা লিখুন, যেমন {example}",
  "Enter a {system} number, e.g. {example}": "{system} সংখ্যা লিখুন, যেমন {example}",
  "Enter your {system} answer": "আপনার {system} উত্তর লিখুন",
  "Enter {system} result": "{system} ফল লিখুন",
  "{system} output": "{system} ফলাফল",
  "{system} Counter": "{system} কাউন্টার",
  "{system} number counter": "{system} সংখ্যা কাউন্টার",
  "Base {base} · {badge}": "ভিত্তি {base} · {badge}",
  "Counter for {system}": "{system} কাউন্টার",
  "Question": "প্রশ্ন",
  "The fractional result continues; shown to 16 digits.": "ভগ্নাংশটি চলমান; ১৬টি অঙ্ক পর্যন্ত দেখানো হয়েছে।",
  "Status: Running": "অবস্থা: চলছে",
  "Status: Paused": "অবস্থা: বিরত",
};

const systemNames = {
  Decimal: "দশমিক",
  Binary: "বাইনারি",
  Octal: "অক্টাল",
  Hexadecimal: "হেক্সাডেসিমেল",
};

const systemLocatives = {
  Decimal: "দশমিকে",
  Binary: "বাইনারিতে",
  Octal: "অক্টালে",
  Hexadecimal: "হেক্সাডেসিমেলে",
};

function getSystemName(name) {
  const canonicalName = Object.keys(systemNames).find(
    (system) => system.toLowerCase() === name.toLowerCase()
  );
  return systemNames[canonicalName] || name;
}

function translateText(text) {
  if (bengaliTranslations[text]) return bengaliTranslations[text];

  const systemMatch = text.match(/^(Decimal|Binary|Octal|Hexadecimal) \(base (\d+)\)$/);
  if (systemMatch) {
    return bengaliTranslations["{system} (base {base})"]
      .replace("{system}", systemNames[systemMatch[1]])
      .replace("{base}", systemMatch[2]);
  }

  const patterns = [
    [
      /^How to Convert (.+) to (.+)$/,
      (_, source, target) =>
        bengaliTranslations["How to Convert {source} to {target}"]
          .replace("{source}", getSystemName(source))
          .replace("{target}", systemLocatives[target] || getSystemName(target)),
    ],
    [
      /^1\. Convert (.+) to Decimal$/,
      (_, source) =>
        bengaliTranslations["1. Convert {source} to Decimal"].replace(
          "{source}",
          getSystemName(source)
        ),
    ],
    [
      /^2\. Convert Decimal to (.+)$/,
      (_, target) =>
        bengaliTranslations["2. Convert Decimal to {target}"].replace(
          "{target}",
          systemLocatives[target] || getSystemName(target)
        ),
    ],
    [
      /^Enter (Decimal|Binary|Octal|Hexadecimal) digits, e\.g\. (.+)$/i,
      (_, system, example) =>
        bengaliTranslations["Enter {system} digits, e.g. {example}"]
          .replace("{system}", getSystemName(system))
          .replace("{example}", example),
    ],
    [
      /^Enter a (Decimal|Binary|Octal|Hexadecimal) number, e\.g\. (.+)$/i,
      (_, system, example) =>
        bengaliTranslations["Enter a {system} number, e.g. {example}"]
          .replace("{system}", getSystemName(system))
          .replace("{example}", example),
    ],
    [
      /^Enter your (Decimal|Binary|Octal|Hexadecimal) answer$/i,
      (_, system) =>
        bengaliTranslations["Enter your {system} answer"].replace(
          "{system}",
          getSystemName(system)
        ),
    ],
    [
      /^Enter (Decimal|Binary|Octal|Hexadecimal) result$/i,
      (_, system) =>
        bengaliTranslations["Enter {system} result"].replace(
          "{system}",
          getSystemName(system)
        ),
    ],
    [
      /^Wrong digit "(.+)" for (Decimal|Binary|Octal|Hexadecimal)\.$/,
      (_, digit, system) =>
        bengaliTranslations['Wrong digit "{digit}" for {system}.']
          .replace("{digit}", digit)
          .replace("{system}", getSystemName(system)),
    ],
    [
      /^(Decimal|Binary|Octal|Hexadecimal) output$/,
      (_, system) =>
        bengaliTranslations["{system} output"].replace(
          "{system}",
          getSystemName(system)
        ),
    ],
    [
      /^(Decimal|Binary|Octal|Hexadecimal) number counter$/,
      (_, system) =>
        bengaliTranslations["{system} number counter"].replace(
          "{system}",
          getSystemName(system)
        ),
    ],
    [
      /^(Decimal|Binary|Octal|Hexadecimal) Counter$/,
      (_, system) =>
        bengaliTranslations["{system} Counter"].replace(
          "{system}",
          getSystemName(system)
        ),
    ],
    [
      /^Base (\d+) · (.+)$/,
      (_, base, badge) =>
        bengaliTranslations["Base {base} · {badge}"]
          .replace("{base}", base)
          .replace("{badge}", bengaliTranslations[badge] || badge),
    ],
    [
      /^Question (\d+) of (\d+)$/,
      (_, current, total) =>
        bengaliTranslations["Question {current} of {total}"]
          .replace("{current}", current)
          .replace("{total}", total),
    ],
    [
      /^Score: (\d+)$/,
      (_, score) => bengaliTranslations["Score: {score}"].replace("{score}", score),
    ],
    [
      /^You scored (\d+) out of (\d+)$/,
      (_, score, total) =>
        bengaliTranslations["You scored {score} out of {total}"]
          .replace("{score}", score)
          .replace("{total}", total),
    ],
    [
      /^Current number (.+)$/,
      (_, value) =>
        bengaliTranslations["Current number {value}"].replace("{value}", value),
    ],
    [
      /^Not quite\. The correct answer is (.+)\.$/,
      (_, answerText) =>
        `সঠিক হয়নি। সঠিক উত্তর হলো ${translateText(answerText)}।`,
    ],
  ];

  for (const [pattern, replace] of patterns) {
    const match = text.match(pattern);
    if (match) return replace(match[0], ...match.slice(1));
  }

  return text;
}

function translateNode(node) {
  if (typeof node === "string") {
    const leadingWhitespace = node.match(/^\s*/)?.[0] || "";
    const trailingWhitespace = node.match(/\s*$/)?.[0] || "";
    const content = node.trim();
    return content
      ? `${leadingWhitespace}${translateText(content)}${trailingWhitespace}`
      : node;
  }

  if (Array.isArray(node)) return Children.map(node, translateNode);
  if (!node || typeof node !== "object" || !node.props) return node;

  const props = { ...node.props };
  if (props.children !== undefined) props.children = translateNode(props.children);

  for (const attribute of ["aria-label", "aria-description", "placeholder", "title", "alt"]) {
    if (typeof props[attribute] === "string") {
      props[attribute] = translateText(props[attribute]);
    }
  }

  return cloneElement(node, props);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === "bn" ? "সংখ্যা পদ্ধতি" : "Number Systems";
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider.");
  return context;
}

export function Localized({ children }) {
  const { language } = useLanguage();
  return language === "bn" ? translateNode(children) : children;
}
