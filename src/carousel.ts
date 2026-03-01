/**
 * Carousel — Image and content slider component
 */
export class Carousel {
    private slides: string[] = [];
    private current = 0;
    private container: HTMLElement | null = null;
    private autoTimer: any = null;

    constructor(slides: string[]) { this.slides = slides; }

    /** Mount carousel to container */
    mount(containerId: string): this {
        this.container = document.getElementById(containerId);
        if (!this.container) return this;
        this.render();
        return this;
    }

    /** Go to next slide */
    next(): this { this.current = (this.current + 1) % this.slides.length; this.render(); return this; }

    /** Go to previous slide */
    prev(): this { this.current = (this.current - 1 + this.slides.length) % this.slides.length; this.render(); return this; }

    /** Go to specific slide */
    goTo(index: number): this { this.current = Math.max(0, Math.min(index, this.slides.length - 1)); this.render(); return this; }

    /** Start auto-advance */
    autoPlay(intervalMs: number = 3000): this {
        this.stopAutoPlay();
        this.autoTimer = setInterval(() => this.next(), intervalMs);
        return this;
    }

    /** Stop auto-advance */
    stopAutoPlay(): this { if (this.autoTimer) { clearInterval(this.autoTimer); this.autoTimer = null; } return this; }

    /** Render */
    private render(): void {
        if (!this.container) return;
        const dots = this.slides.map((_, i) =>
            `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;margin:0 4px;cursor:pointer;background:${i === this.current ? '#3B82F6' : '#D1D5DB'};transition:background 0.2s" data-dot="${i}"></span>`
        ).join('');

        this.container.innerHTML = `
      <div style="position:relative;overflow:hidden;border-radius:12px;background:#F9FAFB">
        <div style="display:flex;transition:transform 0.4s ease;transform:translateX(-${this.current * 100}%)">
          ${this.slides.map((s) => `<div style="flex:0 0 100%;min-width:100%">${s}</div>`).join('')}
        </div>
        <button style="position:absolute;left:8px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.9);border:none;border-radius:50%;width:36px;height:36px;cursor:pointer;font-size:18px;box-shadow:0 2px 6px rgba(0,0,0,0.15)" data-nav="prev">&#8249;</button>
        <button style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.9);border:none;border-radius:50%;width:36px;height:36px;cursor:pointer;font-size:18px;box-shadow:0 2px 6px rgba(0,0,0,0.15)" data-nav="next">&#8250;</button>
        <div style="text-align:center;padding:10px 0">${dots}</div>
      </div>`;

        this.container.querySelector('[data-nav="prev"]')?.addEventListener('click', () => this.prev());
        this.container.querySelector('[data-nav="next"]')?.addEventListener('click', () => this.next());
        this.container.querySelectorAll('[data-dot]').forEach((el) => {
            el.addEventListener('click', () => this.goTo(Number((el as HTMLElement).dataset.dot)));
        });
    }

    /** Create image carousel from URLs */
    static fromImages(urls: string[], alt: string = ''): Carousel {
        return new Carousel(urls.map((url) => `<img src="${url}" alt="${alt}" style="width:100%;height:auto;display:block">`));
    }

    get currentIndex(): number { return this.current; }
    get slideCount(): number { return this.slides.length; }
}
