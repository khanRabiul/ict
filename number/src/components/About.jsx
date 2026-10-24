import profileImage from "../assets/rabiul.png";

const profileLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/khanrabiul/",
    description: "Professional profile",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-6">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 10.18H5.9V18h2.44v-7.82ZM7.12 6.29a1.42 1.42 0 1 0 0 2.84 1.42 1.42 0 0 0 0-2.84ZM18.1 13.52c0-2.35-1.25-3.44-2.92-3.44a2.52 2.52 0 0 0-2.27 1.25v-1.15h-2.44V18h2.44v-4.11c0-1.08.2-2.13 1.55-2.13 1.33 0 1.35 1.24 1.35 2.2V18h2.29v-4.48Z" />
      </svg>
    ),
  },
  {
    label: "DEV Community",
    href: "https://dev.to/dashboard",
    description: "Developer writing",
    icon: (
      <span
        aria-hidden="true"
        className="grid size-6 place-items-center rounded bg-slate-900 text-[9px] font-black tracking-tight text-white"
      >
        DEV
      </span>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/khan.rabiulislam.52",
    description: "Social profile",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-6">
        <path d="M13.4 21v-8.2h2.76l.41-3.2H13.4V7.56c0-.93.26-1.56 1.6-1.56h1.7V3.14c-.3-.04-1.35-.14-2.56-.14-2.53 0-4.26 1.54-4.26 4.37V9.6H7v3.2h2.88V21h3.52Z" />
      </svg>
    ),
  },
];

const About = () => (
  <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
    <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-indigo-700">
      About me
    </p>
    <h1 className="mb-6 bg-linear-to-r from-indigo-800 via-violet-700 to-blue-700 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
      Meet the developer
    </h1>

    <article className="overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-[0_25px_60px_-22px_rgba(79,70,229,0.3)]">
      <div className="grid items-center gap-8 p-6 sm:p-9 md:grid-cols-[minmax(0,1fr)_220px]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-700">
            MERN Stack Developer
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Khan Rabiul Islam
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
            I build modern web applications with the MERN stack: MongoDB,
            Express.js, React, and Node.js. This number systems project makes
            learning number conversion interactive and approachable.
          </p>
          <a
            href="mailto:krabiulislam2@gmail.com"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 font-semibold text-indigo-800 transition hover:bg-indigo-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="size-5"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            krabiulislam2@gmail.com
          </a>
        </div>

        <img
          src={profileImage}
          alt="Portrait of Khan Rabiul"
          className="mx-auto aspect-[4/5] w-full max-w-[220px] rounded-2xl object-cover object-top shadow-xl shadow-indigo-900/15 ring-4 ring-white"
        />
      </div>

      <div className="border-t border-slate-100 bg-slate-50/80 p-6 sm:px-9 sm:py-7">
        <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
          Connect with me
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {profileLinks.map(({ label, href, description, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-indigo-200 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-800">
                {icon}
              </span>
              <span>
                <span className="block font-bold text-indigo-800">{label}</span>
                <span className="mt-1 block text-sm text-slate-500">
                  {description}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </article>
  </section>
);

export default About;
