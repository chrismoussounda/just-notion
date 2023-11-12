import { Footer } from './components/footer';
import { Heading } from './components/heading';
import { Heroes } from './components/heroes';
import { Navbar } from './components/navbar';

const LandingPage = () => {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <Navbar />
      <main className="h-full pt-40">
        <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
          <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
            <Heading />
            <Heroes />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
