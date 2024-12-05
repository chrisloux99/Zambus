"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Bus, Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TravelMessage } from '@/components/home/travel-message';
import Link from 'next/link';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-fade';

const heroImages = [
  {
    url: '/images/lusaka-intercity.jpg',
    alt: 'Lusaka Intercity Terminal'
  },
  {
    url: '/images/power-tools-bus.jpg',
    alt: 'Power Tools Bus at Station'
  },
  {
    url: '/images/mazhandu-bus.jpg',
    alt: 'Mazhandu Family Bus'
  }
];

const popularRoutes = [
  {
    from: 'Lusaka',
    to: 'Livingstone',
    price: 'K350',
    duration: '6 hours'
  },
  {
    from: 'Lusaka',
    to: 'Kitwe',
    price: 'K280',
    duration: '4 hours'
  },
  {
    from: 'Ndola',
    to: 'Lusaka',
    price: 'K300',
    duration: '4.5 hours'
  }
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      <div className="relative h-[80vh]">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="absolute inset-0"
        >
          {heroImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[80vh] w-full">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center space-y-6 px-4">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              ZamBus
            </motion.h1>
          </div>
        </div>
      </div>

      <TravelMessage />

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={`${route.from}-${route.to}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold">{route.from} → {route.to}</h3>
                      <p className="text-sm text-muted-foreground">Duration: {route.duration}</p>
                    </div>
                    <p className="text-2xl font-bold text-primary">{route.price}</p>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/book?from=${route.from.toLowerCase()}&to=${route.to.toLowerCase()}`}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg"
            >
              <Bus className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Modern Fleet</h3>
              <p className="text-muted-foreground">Travel in comfort with our modern and well-maintained buses</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg"
            >
              <MapPin className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Multiple Routes</h3>
              <p className="text-muted-foreground">Extensive network covering all major cities in Zambia</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg"
            >
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Easy Booking</h3>
              <p className="text-muted-foreground">Book your tickets online with just a few clicks</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg"
            >
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Round-the-clock customer support for your convenience</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}