/**
 * @see https://github.com/dsrkafuu/sakana-widget
 */

import type { Fn, MaybeComputedRef, MaybeRef } from "@vueuse/core";

export type StrokeStyle = CanvasGradient | CanvasGradient | string;

export interface Options {
  size?: MaybeRef<number>;
  /** image url */
  image?: MaybeComputedRef<string>;
  /** 惯性 inertia */
  i?: MaybeComputedRef<number>;
  /** 粘性 stickiness */
  s?: MaybeComputedRef<number>;
  /** 衰减 decay */
  d?: MaybeComputedRef<number>;
  /** angle */
  r?: MaybeRef<number>;
  /** height */
  y?: MaybeRef<number>;
  /** verticalSpeed */
  t?: MaybeRef<number>;
  /** horizontalSpeed */
  w?: MaybeRef<number>;
  /** rotate origin */
  rotate?: MaybeComputedRef<number>;
  strokeStyle?: MaybeComputedRef<StrokeStyle> | ((ctx: CanvasRenderingContext2D, canvas?: HTMLCanvasElement) => StrokeStyle);
  strokeWidth?: MaybeComputedRef<number>;
  rod?: MaybeComputedRef<boolean>;
  draggable?: MaybeComputedRef<boolean>;
  /** motion stop threshold */
  threshold?: MaybeComputedRef<number>;
  autoFit?: MaybeComputedRef<boolean>;
}

export function useWidgetShake(options?: Options) {
  const {
    size: _size = 200,
    image: _image,
    i: _inertia = 0.08,
    s: _stickiness = 0.1,
    d: _decay = 0.988,
    r: _angle = 0,
    y: _height = 0,
    t: _verticalSpeed = 0,
    w: _horizontalSpeed = 0,
    strokeStyle: _strokeStyle = "#ddd",
    strokeWidth: _strokeWidth = 13,
    rod: _rod = true,
    draggable: _draggable = true,
    rotate: _rotate = 0,
    threshold: _threshold = 0.1,
    autoFit: _autoFit = false,
  } = options || {};

  const size = ref(_size);
  const image = resolveRef(_image);
  const i = computed(() => clamp(resolveRef(_inertia).value, 0.5, 0));
  const s = resolveRef(_stickiness);
  const d = resolveRef(_decay);
  const r = ref(_angle);
  const y = ref(_height);
  const t = ref(_verticalSpeed);
  const w = ref(_horizontalSpeed);
  const strokeStyle = typeof _strokeStyle === "function" ? ref(_strokeStyle) : resolveRef(_strokeStyle);
  const strokeWidth = resolveRef(_strokeWidth);
  const rod = resolveRef(_rod);
  const draggable = resolveRef(_draggable);
  const rotate = resolveRef(_rotate);
  const threshold = resolveRef(_threshold);
  const autoFit = resolveRef(_autoFit);

  // limits
  const maxR = computed(() => {
    const max = size.value / 5;
    if (max < 30) {
      return 30;
    }
    if (max > 60) {
      return 60;
    }
    return max;
  });
  const maxY = computed(() => size.value / 4);
  const minY = computed(() => -size.value);

  // doms
  const wrapperRef = ref<HTMLDivElement>();
  const appRef = ref<HTMLDivElement>();
  const canvasRef = ref<HTMLCanvasElement>();
  const mainRef = ref<HTMLDivElement>();
  const imageRef = ref<HTMLDivElement>();

  const context = ref<CanvasRenderingContext2D>();

  const { pixelRatio } = useDevicePixelRatio();

  // dom sizes
  const imageSize = computed(() => size.value / 1.25);
  const canvasSize = computed(() => size.value * 1.5);
  const canvasRenderSize = computed(() => canvasSize.value * pixelRatio.value);

  // private
  const _running = ref(false);
  const _lastRunUnix = ref(Date.now());
  const _frameUnix = ref(1000 / 60); // default to speed of 60 fps

  function updateDom() {
    if (imageRef.value && image.value) {
      imageRef.value.style.backgroundImage = `url('${image.value}')`;
    }
  }
  watch(image, updateDom, { immediate: true });

  function updateSize() {
    const app = appRef.value;
    if (app) {
      app.style.width = `${size.value}px`;
      app.style.height = `${size.value}px`;
    }

    const canvas = canvasRef.value;
    if (canvas) {
      canvas.style.width = `${canvasSize.value}px`;
      canvas.style.height = `${canvasSize.value}px`;
      canvas.width = canvasRenderSize.value;
      canvas.height = canvasRenderSize.value;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Invalid canvas context");
      }
      // scale all drawing operations by the dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(pixelRatio.value, pixelRatio.value);
      context.value = ctx;
      draw();
    }

    const main = mainRef.value;
    if (main) {
      main.style.width = `${size.value}px`;
      main.style.height = `${size.value}px`;
    }

    const image = imageRef.value;
    if (image) {
      image.style.width = `${imageSize.value}px`;
      image.style.height = `${imageSize.value}px`;
      image.style.transformOrigin = `50% ${size.value}px`; // use the bottom center of widget as trans origin
    }
  }
  watch(size, updateSize, { immediate: true });

  function draw() {
    const ctx = context.value;
    if (!ctx) { return; }
    // move the image
    const x = r.value * 1;
    const image = imageRef.value;
    if (image) {
      image.style.transform = `rotate(${r.value}deg) translateX(${x}px) translateY(${y.value}px)`;
    }
    // draw the canvas line
    ctx.clearRect(0, 0, canvasSize.value, canvasSize.value);
    ctx.save();
    // use the bottom center of widget as axis origin
    // note that canvas is 1.5 times larger than widget
    ctx.translate(canvasSize.value / 2, size.value + (canvasSize.value - size.value) / 2);
    if (rod.value) {
      ctx.beginPath();
    }
    // WidgetShakeBase (height + diameter) / 2
    ctx.moveTo(0, -27.5);
    if (rod.value) {
      const radius = size.value - imageSize.value / 2;
      const { nx, ny } = calcCenterPoint(r.value, radius, x, y.value);
      ctx.lineTo(nx, -ny);
      const _strokeStyle = strokeStyle.value;
      if (typeof _strokeStyle === "function") {
        ctx.strokeStyle = _strokeStyle(ctx, canvasRef.value);
      } else {
        ctx.strokeStyle = _strokeStyle;
      }
      ctx.lineWidth = strokeWidth.value;
      ctx.lineCap = "round";
      ctx.stroke();
    }
    ctx.restore();
  }

  function onResize(el: HTMLElement) {
    function _onResize(rect: DOMRect) {
      const newSize = Math.min(rect.width, rect.height);
      size.value = Math.max(120, newSize); // at least 120
    }

    const rect = el.getBoundingClientRect();
    _onResize(rect);

    const throttled = throttleAnimation((entries) => {
      if (!entries || !entries[0]) { return; }
      _onResize(entries[0].contentRect);
    });
    const { stop } = useResizeObserver(el, throttled);
    return stop;
  }
  const resizeStop = ref<Fn>();
  watch([wrapperRef, autoFit], ([wrapper, auto]) => {
    if (wrapper) {
      if (auto) {
        resizeStop.value = onResize(wrapper);
      } else {
        resizeStop.value?.();
        resizeStop.value = undefined;
      }
    }
  }, { immediate: true });

  const listeners: Fn[] = [];
  watch([imageRef, draggable], ([image, drag]) => {
    if (image) {
      if (drag) {
        const mousedownStop = useEventListener(image, "mousedown", onStart);
        const touchstartStop = useEventListener(image, "touchstart", onStart);
        listeners.push(mousedownStop, touchstartStop);
      } else {
        listeners.forEach(fn => fn());
        listeners.length = 0;
      }
    }
  }, { immediate: true });

  function onStart(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    _running.value = false;
    const event = isTouchEvent(e) ? e.touches[0] : e;
    if (!event) { return; }
    const { pageY } = event;
    const _downPageY = pageY;
    w.value = 0;
    t.value = 0;

    const moveStop = useEventListener(document, isTouchEvent(e) ? "touchmove" : "mousemove", _onMove);
    const endStop = useEventListener(document, isTouchEvent(e) ? "touchend" : "mouseup", _onEnd);

    function _onMove(_e: MouseEvent | TouchEvent) {
      const _event = isTouchEvent(_e) ? _e.touches[0] : _e;
      if (!_event) { return; }
      const main = mainRef.value;
      if (main) {
        const rect = main.getBoundingClientRect();
        const leftCenter = rect.left + rect.width / 2;
        const { pageX, pageY } = _event;
        const x = pageX - leftCenter;
        const y = pageY - _downPageY;
        move(x, y);
      }
    }

    function _onEnd() {
      moveStop();
      endStop();
      _running.value = true;
      requestAnimationFrame(run);
    }
  }

  function move(_x: number, _y: number) {
    let _r = _x * s.value;
    _r = Math.max(-maxR.value, _r);
    _r = Math.min(maxR.value, _r);
    _y = _y * s.value * 2;
    _y = Math.max(minY.value, _y);
    _y = Math.min(maxY.value, _y);
    r.value = _r;
    y.value = _y;
    w.value = 0;
    t.value = 0;
    draw();
  }

  function run() {
    if (!_running.value) { return; }
    let originRotate = rotate.value;
    originRotate = Math.min(120, Math.max(0, originRotate));
    const cut = threshold.value;
    const thisRunUnix = Date.now();
    let _inertia = i.value;

    // ignore if frame diff is above 16ms (60fps)
    const lastRunUnixDiff = thisRunUnix - _lastRunUnix.value;
    if (lastRunUnixDiff < 16) {
      _inertia = (i.value / _frameUnix.value) * lastRunUnixDiff;
    }
    _lastRunUnix.value = thisRunUnix;

    let _w = w.value;
    let _r = r.value;
    _w = _w - _r * 2 - originRotate;
    _r = _r + _w * _inertia * 1.2;
    w.value = _w * d.value;
    r.value = _r;

    let _t = t.value;
    let _y = y.value;
    _t = _t - _y * 2;
    _y = _y + _t * _inertia * 2;
    t.value = _t * d.value;
    y.value = _y;

    // stop if motion is too little
    if (
      Math.max(
        Math.abs(w.value),
        Math.abs(r.value),
        Math.abs(t.value),
        Math.abs(y.value),
      ) < cut
    ) {
      _running.value = false;
      return;
    }

    draw();
    requestAnimationFrame(run);
  }

  function autoRun() {
    if (!_running.value) {
      t.value = t.value + (Math.random() - 0.5) * 50;
      w.value = w.value + (Math.random() - 0.5) * 80;
      _running.value = true;
      requestAnimationFrame(run);
    }
  }

  onMounted(() => {
    updateDom();
    updateSize();
    autoRun();
  });

  return {
    wrapperRef,
    appRef,
    canvasRef,
    mainRef,
    imageRef,
  };
}

function clamp(value: number, max: number, min: number) {
  return Math.min(max, Math.max(min, value));
}

function calcCenterPoint(degree: number, radius: number, x: number, y: number) {
  const radian = (Math.PI / 180) * degree;
  const cos = Math.cos(radian);
  const sin = Math.sin(radian);
  const nx = sin * radius + cos * x - sin * y;
  const ny = cos * radius - cos * y - sin * x;
  return { nx, ny };
}

/**
 * throttle a func with requestAnimationFrame,
 * https://github.com/wuct/raf-throttle/blob/master/rafThrottle.js
 */
export function throttleAnimation<T extends (...args: any[]) => any>(callback: T): T {
  let requestId: number | null = null;
  let lastArgs: any[];
  const later = (context: any) => () => {
    requestId = null;
    callback.apply(context, lastArgs);
  };
  const throttled = function (...args: any[]) {
    lastArgs = args;
    if (requestId === null) {
      // @ts-expect-error this refers to context inherited from outside
      requestId = requestAnimationFrame(later(this));
    }
  } as T;
  return throttled;
}
