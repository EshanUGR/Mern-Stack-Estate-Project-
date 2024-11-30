import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlwMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgMEAQUH/8QALBABAAIBAgIJBAMBAAAAAAAAAAECAxEhBDESIjJBUVJhcaEUM0KRU2KBE//EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+4gAAAAAAAAAAAAAAAAAAAAAAAAACFrxHLdCb2Bc5qo1kBoGfWY5SnF5j1BaI1vE+iQAAAAAAAAAAE7Kr3mdo2gyW12jkgAAAAAAAspfulWA0CvHbXaVgAAAAAACN50hJVlnfQEAAHLWitZmeUOsnF31vFY7gcycRe21erCH/S/nt+0BUX4+JtG1948WuJiY1idYea1cJba1Z7t4RWgADkvrOsaqFmKe4FgAAAAACi/aleot2pBwABh4j71m5k4uml+l5gUAKgv4T7k+yhp4OvatPtANICKJY+2ilj7UAuAAAAAAU5I0suV5Y7wVgAI3rF6zWzszERrMxEeqm3E0jsxM/AKcmC9J5ax4wr0nwn9NH1U+T5Pqp8nyCGPh7W0m3VhriIrGkRpEM/1U+SP2nTiKWnra1BcGsTyAE8UdbVBbjjSvuCYAAAAADkxrGjoCi0aTo5y3nuXXr0o9WXipmuKY5a7Ay5ss5Lf1jlCsFQAAABdw+WaW6MzrWfhsea9DDrfHWfGEVOlelPovRrXowkAAAAAAAAArzYq5a6W/yVgDysvD5MXONY8YVPaU34bFedZrpPpsDyxutwMfjeY94R+hn+T4UYxurwNfyvM+2y/Hgx4960jXxlBhw8LfLvMTWvjL0MeOuOsVryhMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k=",
    },
  },
  { timestamps: true }
);
//timestamps=add another extra information

const User=mongoose.model('User',userSchema);
export default User;
