import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-600">Aesthreets</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-8 text-center">About Us</h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-12 md:mt-20 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4 tracking-wide uppercase">
              Our Story
            </h3>
            <p className="text-base sm:text-lg text-gray-800 mb-4 leading-relaxed font-light">
              Aesthreets is a vibrant startup born in the heart of Nagpur, India. Our brand name is a creative fusion of <span className="italic font-semibold text-green-600">'Aesthetic'</span> and <span className="italic font-semibold text-green-600">'Streets'</span>, embodying our mission to bring stylish, eye-catching designs to everyday streetwear.
            </p>
            <p className="text-base sm:text-lg text-gray-800 mb-4 leading-relaxed font-light">
              We believe that fashion should be both beautiful and accessible. That's why we craft each piece with attention to aesthetic detail, while ensuring it's comfortable and suitable for daily wear.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Top Row */}
            <img 
              src="/images/1.jpg" 
              alt="T-shirt design 1" 
              className="rounded-lg shadow-md object-cover h-48 sm:h-60 md:h-72 w-full" 
            />
            <img 
              src="/images/2.jpg" 
              alt="T-shirt design 2" 
              className="rounded-lg shadow-md object-cover h-48 sm:h-60 md:h-72 w-full" 
            />

            {/* Bottom Row */}
            <img 
              src="/images/4.jpg" 
              alt="T-shirt design 3" 
              className="rounded-lg shadow-md object-cover h-48 sm:h-60 md:h-72 w-full" 
            />
            <img 
              src="/images/5.jpg" 
              alt="T-shirt design 4" 
              className="rounded-lg shadow-md object-cover h-48 sm:h-60 md:h-72 w-full" 
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mt-12 md:mt-20 mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 tracking-wide uppercase">Our Vision</h3>
          <p className="text-base sm:text-lg text-gray-800 mb-4 leading-relaxed font-light">
            At Aesthreets, we envision a world where self-expression through fashion is not just a luxury, but a daily celebration. We're committed to creating t-shirts that are not just garments, but canvases for personal style and creativity.
          </p>
          <p className="text-base sm:text-lg text-gray-800 mb-4 leading-relaxed font-light">
            Our designs draw inspiration from the vibrant streets of Nagpur and blend them with global aesthetic trends, resulting in unique pieces that stand out in any crowd.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 md:mt-20">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 tracking-wide uppercase">Quality</h4>
            <p className="text-base sm:text-lg text-gray-800 mb-4 leading-relaxed font-light">We use premium materials and cutting-edge printing techniques to ensure our t-shirts look great and last long.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 tracking-wide uppercase">Creativity</h4>
            <p className="text-base sm:text-lg text-gray-800 mb-4 leading-relaxed font-light">Our designs are crafted by local artists, bringing fresh and unique perspectives to street fashion.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 tracking-wide uppercase">Community</h4>
            <p className="text-base sm:text-lg text-gray-800 mb-4 leading-relaxed font-light">We're proud of our Nagpur roots and are committed to giving back to our local community.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;

