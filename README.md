# webext-carousel — Content Slider Component
> **Built by [Zovo](https://zovo.one)** | `npm i webext-carousel`

Image/content slider with dot navigation, prev/next buttons, and auto-play.

```typescript
import { Carousel } from 'webext-carousel';
const slider = Carousel.fromImages(['img1.png', 'img2.png', 'img3.png']);
slider.mount('slider-container').autoPlay(3000);
```
MIT License
