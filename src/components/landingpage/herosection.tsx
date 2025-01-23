import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroImg1 from "../../assets/HeroCardImg1.png";
import HeroImg2 from "../../assets/HeroCardImg2.png";

export function HeroSection() {
  return (
    <div className="mb-8 overflow-x-auto md:overflow-x-hidden">
      <div className="flex flex-nowrap gap-8 md:gap-8">
        {/* Hero Card 1 */}
        <div className="h-[350px] md:h-[360px] w-full md:w-[48%] flex-shrink-0 rounded-[10px] bg-gradient-to-br from-[#54A6FF] to-[#3563E9] p-6 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-white leading-[150%] mb-4">
              The Best Platform <br /> for Car Rental
            </h2>
            <p className="text-[14px] sm:text-[16px] text-white/70 mb-6">
              Ease of doing a car rental safely and <br />
              reliably. Of course at a low price.
            </p>
            <Link href="/category">
              <Button
                variant="secondary"
                className="bg-white text-[#3563E9] hover:bg-white/90 px-6 py-2"
              >
                Rental Car
              </Button>
            </Link>
          </div>
          <Image
            src={HeroImg1.src}
            alt="Koenigsegg"
            width={500}
            height={160}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 object-contain w-full h-auto max-w-[320px] sm:max-w-[400px]"
          />
        </div>

        {/* Hero Card 2 */}
        <div className="h-[350px] md:h-[360px] w-full md:w-[48%] flex-shrink-0 rounded-[10px] bg-[#54A6FF] p-6 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-white leading-[150%] mb-4">
              Easy way to rent a <br /> car at a low price
            </h2>
            <p className="text-[14px] sm:text-[16px] text-white/70 mb-6">
              Providing cheap car rental services <br />
              and safe and comfortable facilities.
            </p>
            <Link href="/category">
              <Button
                variant="secondary"
                className="bg-white text-[#3563E9] hover:bg-white/90 px-6 py-2"
              >
                Rental Car
              </Button>
            </Link>
          </div>
          <Image
            src={HeroImg2.src}
            alt="Nissan GT-R"
            width={500}
            height={160}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 object-contain w-full h-auto max-w-[320px] sm:max-w-[400px]"
          />
        </div>
      </div>
    </div>
  );
}
