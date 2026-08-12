# Demo10 无背景版本：网站嵌入二次开发规格

状态：最终交付基线 / 二次开发参考

本规格以已确认的 Demo10 无背景版本为唯一行为基线。后续网站嵌入、主题适配、组件封装或性能优化都必须保持本文的外部行为；若需要改变视觉、交互、采样或运行逻辑，应先建立新的版本和验收记录，不直接覆盖本基线。

## Problem Statement

网站需要嵌入一个可稳定呈现 FLYOKAY LED flying orb 图像的交互组件。用户需要在桌面、手机、平板及不同触控环境中看到相同的伪 3D 球体、图片采样结果和交互规则，同时页面背景可以由宿主网站控制，而不是被 Demo 自带背景覆盖。

此前迭代中出现过以下风险：用不同渲染技术替换 Canvas 后成像与已确认版本不一致；背景资源超出 LED 点边界；拖拽后的角度回正或切图方向反转；移动端首屏同时加载多张原图造成空白或阻塞；轮播在不同屏幕宽度下出现半张图片、数量变化或触控滑动误触。二次开发必须把这些问题视为验收边界。

## Solution

保留 Demo10 无背景版本的 Canvas 2D 球体渲染和 React + TypeScript 组件结构，仅将组件嵌入宿主网站的容器、路由和资源前缀做适配。组件不绘制、不加载页面背景图片，宿主页面的背景透过透明根层显示。

球体由 9,540 个 LED 色点组成（159 列 × 60 行），使用固定的球面点位布局、图片纹理采样、深度排序、透视投影和黑色间隙底层，形成可拖拽、自动旋转、可切换图片的伪 3D 球体。缩略图轮播根据可用宽度显示 2–5 张完整图片，左右按钮和移动端横向滑动共享同一组循环状态。

二次开发的唯一高层 seam 是 `ColorSphere` 交互组件：宿主只提供容器尺寸、资源基路径和生命周期，不拆分或重写球体内部的旋转、采样、绘制和轮播状态机。资源加载、构建输出和静态部署是同一 seam 的交付边界。

## User Stories

1. As a website visitor, I want to see a transparent-background LED orb, so that the host website controls the surrounding visual background.
2. As a website visitor, I want the orb to contain exactly 9,540 LED color points, so that the image density matches the approved Demo10 appearance.
3. As a website visitor, I want the sampled image to cover the full 159 × 60 LED texture, so that the chosen image is represented across the complete sphere grid.
4. As a website visitor, I want the image colors to be mapped to the sphere points, so that the flat source image appears as a pseudo-3D orb.
5. As a website visitor, I want front-facing points to appear stronger and rear-facing points to be attenuated, so that depth is visually legible.
6. As a website visitor, I want LED points to be rendered as individual circles, so that the approved pixel/LED visual language is preserved.
7. As a website visitor, I want the gaps between points to be closed by a dark layer, so that the sphere does not look hollow between LEDs.
8. As a website visitor, I want the dark gap layer to remain behind the color points, so that it never covers or muddies an LED color.
9. As a website visitor, I want the dark gap layer clipped inside the sphere outline, so that no black cap or extra black border appears above, below, or outside the LED boundary.
10. As a website visitor, I want the approved gap black intensity (`rgba(0, 0, 0, 0.80)`) to remain stable, so that Demo10 visual contrast is preserved.
11. As a website visitor, I want the orb to rotate automatically when idle, so that the experience communicates motion without requiring input.
12. As a mouse user, I want hovering over the orb control area to pause automatic rotation, so that I can inspect the current image.
13. As a mouse user, I want moving outside the orb control area to resume the established return/rotation behavior, so that the canvas outside the sphere is not treated as an unintended control target.
14. As a touch user, I want touching and dragging the orb to rotate it, so that the experience works without a mouse.
15. As a pointer user, I want horizontal movement to change horizontal rotation and vertical movement to change vertical rotation, so that dragging feels direct and predictable.
16. As a pointer user, I want vertical rotation to stay within the approved clamp, so that the sphere cannot be dragged into an invalid extreme.
17. As a pointer user, I want the orb to return to its approved front orientation after a drag ends or the pointer leaves, so that every completed interaction settles predictably.
18. As a pointer user, I want return motion to use the established centered angle rather than an arbitrary shortest-path angle, so that the image is centered when the orb settles.
19. As a website visitor, I want selecting a new thumbnail to trigger a smooth transition, so that an image change does not look like a hard replacement.
20. As a website visitor, I want a new image switch to move only forward toward the next centered front orientation, so that it never makes an unexpected reverse/counter-clockwise turn.
21. As a website visitor, I want a new image switch to complete one approved forward-turn transition and finish with the new image centered, so that the starting angle cannot corrupt the new image orientation.
22. As a website visitor, I want the selected thumbnail to lift and scale slightly, so that the active image is visually distinguishable without a bottom shadow.
23. As a website visitor, I want the currently selected image to remain highlighted after a group change, so that selection state is not confused with carousel position.
24. As a desktop user, I want left and right carousel buttons to sit on the same horizontal centerline as the thumbnails, so that controls are easy to reach.
25. As a desktop user, I want carousel controls to stay close to the thumbnail group, so that the layout does not waste horizontal space.
26. As a mobile user, I want the carousel to show as many complete thumbnails as fit, capped at five and never below two, so that no thumbnail is cut in half.
27. As a tablet user, I want the thumbnail count and size to adapt to the viewport, so that the carousel remains usable in portrait and landscape orientations.
28. As a carousel user, I want the next group to contain exactly the same number of images as the current group, so that the layout does not jump between transitions.
29. As a carousel user, I want the image list to loop indefinitely, so that reaching the final source image does not disable navigation.
30. As a carousel user, I want looping to continue in source order and wrap to the first image, so that the sequence remains understandable.
31. As a desktop user, I want clicking the left or right button to animate the group in the corresponding direction, so that the transition communicates cause and effect.
32. As a touch user, I want a left swipe to move to the next group and a right swipe to move to the previous group, so that the carousel follows common mobile conventions.
33. As a touch user, I want short or predominantly vertical swipes to do nothing, so that scrolling and accidental gestures do not change the image group.
34. As a touch user, I want a swipe to be handled once even if the browser emits a follow-up click, so that a swipe cannot also select an unintended thumbnail.
35. As a legacy mobile/WebView user, I want a Touch Events fallback when Pointer Events are unavailable, so that carousel swiping still works on older embedded environments.
36. As a website visitor, I want only the current sphere image to load initially, so that first paint is not blocked by all source images.
37. As a website visitor, I want other sphere images to load when selected and then be cached, so that later switches are responsive without an excessive first-load cost.
38. As a website visitor, I want thumbnails to use efficient WebP with JPG fallback, so that the carousel remains broadly compatible and light.
39. As a website visitor, I want the animation to pause when the page is hidden, so that background tabs do not waste CPU and battery.
40. As a website visitor, I want the animation to pause when the sphere leaves the viewport, so that off-screen rendering does not compete with the visible page.
41. As a website visitor, I want the animation to resume when the page or sphere becomes visible again, so that returning to the component does not leave it frozen.
42. As a user with reduced-motion enabled, I want carousel motion to be reduced or removed, so that the component respects accessibility preferences.
43. As a keyboard user, I want thumbnail buttons and carousel buttons to remain native buttons with labels, so that the image selector is operable and announced.
44. As an integrator, I want the component to work under a nested website route, so that asset URLs do not depend on the site root.
45. As an integrator, I want a static build and a local HTTP preview, so that I can verify the same resource behavior before embedding.
46. As an integrator, I want the host page to own page background, typography, and outer layout, so that embedding does not introduce an unexpected full-page visual system.
47. As an integrator, I want the approved image assets and thumbnails to remain identifiable and replaceable, so that a future content update does not require rewriting rendering logic.
48. As a maintainer, I want the source, build, direct-open preview, and validation notes to stay aligned, so that a delivered artifact can be reproduced and audited.

## Implementation Decisions

- Use React + TypeScript with one high-level `ColorSphere` component and small pure helpers for sphere layout and swipe-direction measurement.
- Keep Canvas 2D as the rendering technology. Do not replace it with WebGL or a visually different optimization unless a new version is separately approved against screenshots and interaction tests.
- Represent the LED layout as 159 columns × 60 rows, with the full sphere latitude model using 80 rows. Preserve the established point order and point metadata (`row`, `col`, normalized image coordinates).
- Build a 159 × 60 texture for each source image by drawing the entire image into the sampling canvas. Preserve the existing full-image stretch behavior; do not silently introduce a crop, cover rule, color filter, or aspect-ratio change.
- Convert sampled RGBA data into the renderer's column-major point order before drawing, so the image-to-sphere mapping stays aligned with the approved layout.
- Draw the visible LED color points in two depth passes, then draw the dark gap circles with `destination-over`. The gap circles must use the same projected point cache as the color points, use the approved edge handling, and be clipped to the inner sphere boundary.
- Keep the page/root/experience backgrounds transparent and remove bundled page background image dependencies. Background ownership belongs to the host website.
- Keep the renderer's capped device-pixel ratio, resize handling, one-frame projected coordinate caches, and 34 ms render cadence. Any performance change must preserve the external image, depth, and interaction output.
- Keep automatic rotation, pointer hover pause, drag state, pointer capture, cancellation handling, and immediate established return behavior. Mouse proximity outside the sphere control boundary must not accidentally pause the orb.
- Keep the return target derived from the approved default front orientation and normalized to a centered rotation, rather than storing an arbitrary release angle.
- Keep switch animation state isolated in a single switch controller. While switching, it owns rotation and image blending; stale drag-return state must not take control back after the switch.
- On image selection, load/cache the requested source, mark it active, and animate forward to the next centered front orientation. The transition must never choose a reverse direction from the current angle and must finish with the new texture centered.
- Keep the approved image transition timing and blend window as behavior contracts; do not expose them as arbitrary host settings in the first embedding pass.
- Keep eight source images and their paired JPG/WebP thumbnails as the current content set. Content replacement must preserve stable indexing, source order, and circular wrap semantics.
- Compute visible thumbnail count from viewport width, control widths, gaps, and thumbnail size. Clamp the result to 2–5 and render a complete fixed-size group.
- Keep group movement circular and stride by the visible count. When the group crosses the end, wrap to the start while preserving group size.
- Use GSAP for the approved carousel entrance/exit transition, with an in-flight guard so repeated clicks cannot corrupt group state. Respect `prefers-reduced-motion`.
- Support Pointer Events for modern touch devices and a Touch Events fallback for older mobile/WebView environments. Treat only sufficiently long, predominantly horizontal gestures as carousel swipes.
- Use relative asset URLs that resolve from the embedded route. The build must work under `/demos/demo10-no-background/` or an equivalent nested path without root-relative assumptions.
- Keep the static build as the deployable artifact. The direct-open preview may inline the built script for file-based review, but HTTP preview remains the reference for resource-loading verification.
- Keep page visibility and IntersectionObserver lifecycle pauses. Clean up animation frames, observers, event listeners, and pending component effects on unmount.
- Do not add an upload backend, user account, database, community gallery, likes, downloads, or hardware Bluetooth integration to this website preview. The current “image sampling” feature means selecting a bundled source image and sampling it to LED colors, not accepting arbitrary user uploads.

## Testing Decisions

- Test external behavior at the `ColorSphere` component seam and at the built static page seam. Do not assert private ref names, internal array layouts, GSAP implementation details, or exact minified bundle text.
- Verify the initial render on a local HTTP server and on the deployed nested Pages route. A successful TypeScript/build command alone is insufficient.
- Verify that the root and experience are transparent, that no bundled background image is requested, and that no black region extends beyond the LED sphere at the top, bottom, or outer edge.
- Verify the point-count contract indirectly through the rendered image geometry and sampling dimensions: 159 × 60 = 9,540 points, stable sphere silhouette, and correct image coverage. If adding a diagnostic mode, keep it development-only.
- Verify image sampling by selecting every source image and checking that the visible sphere colors change, the new image reaches the centered front orientation, and no reverse turn occurs after a drag at an arbitrary angle.
- Verify idle auto-rotation, hover pause/resume, drag rotation, vertical clamp, pointer capture, pointer cancel, pointer leave, immediate/established return behavior, and page-hidden/viewport-hidden pause/resume.
- Verify image selection while the sphere is being dragged. The switch must own the transition, advance forward only, finish centered, and not be overridden by stale return state.
- Verify desktop carousel controls, horizontal centerline alignment, selected-thumbnail lift/scale without shadow, group slide direction, in-flight click guarding, and reduced-motion behavior.
- Verify responsive visible counts at representative widths, including narrow phones, iPhone-sized portrait widths, Android portrait widths, tablets, desktop widths, and resized/orientation-changed layouts. Assert 2–5 complete thumbnails and no partial image.
- Verify circular group order with eight images at visible counts 2, 3, 4, and 5, including the final-to-first wrap and equal group size after every move.
- Verify touch swipes: left advances, right reverses, vertical/short gestures do nothing, one swipe produces one group change, and the thumbnail click is suppressed after a valid swipe.
- Verify older WebView/Pointer Events fallback behavior where available; otherwise document the browser limitation rather than treating desktop success as mobile proof.
- Verify first-load network behavior: current sphere image loads first, thumbnails use WebP with JPG fallback, other original sphere images load on selection, and repeated selection uses the cache.
- Verify source reproduction with `npm install`, `npm run build`, and `npx tsc --noEmit`. Verify the static output contains the JS, eight original images, sixteen thumbnail variants, and no background image files.
- Verify at least three consecutive runs on iPhone Safari, Android Chrome, Android WebView, iPad/Android tablet, and desktop browsers. Record device, browser, viewport, first-render result, drag/return, image switch, carousel controls, swipe, and background appearance.
- Prior art is the existing Demo10 validation record and the earlier Demo6/Demo8 interaction acceptance history: preserve their tested external behaviors, but use this no-background build as the visual and asset baseline.

## Out of Scope

- Changing the approved Demo10 LED gap strength, point count, point placement, image sampling dimensions, sphere silhouette, or interaction direction.
- Reintroducing `Background.png`, `Background-mobile.png`, or any component-owned full-page background.
- Replacing Canvas 2D with WebGL, Three.js, CSS 3D, video, or a prerendered static image.
- Arbitrary user image upload, server-side image processing, moderation, account storage, likes, downloads, or public sharing.
- Bluetooth control of the physical flying orb or claims that the website preview is the hardware app.
- Shopify product, cart, checkout, pricing, variants, shipping, policies, reviews, discount logic, or store-connected theme implementation.
- New image-management APIs, CMS integration, localization, analytics, or host-specific design-system changes unless separately specified.
- Guaranteeing identical frame rate on every device. The acceptance requirement is stable loading and complete external behavior on the supported test matrix; device-specific limitations must be recorded.

## Further Notes

- The no-background version is a final visual baseline, not permission to edit the previously delivered Demo10 package in place. Create a new version for any visual or logic change.
- The host integration must reserve a stable, non-zero container size. If the host collapses the canvas or applies an opaque ancestor background, that is an integration issue rather than a sphere-rendering rule.
- Preserve the asset path contract when nesting the demo. The most common deployment failure in prior mobile tests was a page that returned HTML but failed to load relative JS/image assets; test the actual nested URL and resource responses.
- The transparent page is intentional: the canvas itself still contains the LED points and clipped dark gaps. “No background” does not mean removing the approved dark gap layer inside the LED boundary.
- The current renderer uses a source image stretched to 159 × 60 for sampling. If future product requirements demand 1:1 crop, contain, letterboxing, or user-controlled crop, that is a new sampling decision and must not be introduced silently.
- The current source set is eight images. The carousel algorithm is circular and should remain data-driven so a later content set can be changed without rewriting the transition state machine.
- When embedding, prefer one mounted component instance per visible experience. If multiple instances are required, isolate their animation, texture cache, and pointer state rather than sharing mutable module state.
- Publish and deployment checks should include both the Git commit identity and live resource HTTP checks. A successful push is not evidence that Pages has finished deploying.
- This document is the reference for implementation and acceptance. Any future deviation should link to a new issue, identify the changed contract, and include updated desktop and mobile evidence.
