// This tells TS that .gif files are valid modules that export a string
declare module "*.gif" {
    const value: string;
    export default value;
}
  
// You'll likely need these for Tailwind/React projects too:
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.mp4";