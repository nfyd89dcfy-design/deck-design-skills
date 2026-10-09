# Визуальные референсы и сборки

Подобрано 9 октября 2026. Критерий: небольшие по размеру (текст, мелкий CSS/HTML),
без сборки и тяжелых зависимостей. Читать целиком не нужно: берем по одному-два файла.

## Брать (легкие)

| Источник | Вес | Что взять |
|---|---|---|
| [anthropics/skills: frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) | один SKILL.md | Список признаков "сделано нейросетью": подпись капсом над каждым заголовком, строки через точки, градиентные заливки как декор, одинаковые карточки. Принцип: одна запоминающаяся деталь, остальное тихо. Уже учтено в анти-паттернах 21-27 |
| [jiji262/claude-design-skill](https://github.com/jiji262/claude-design-skill) | markdown, 9 справочников, 6 стартовых HTML, MIT | Готовый `deck-stage.html` (масштаб, навигация, печать в PDF) и разбор слайдов. Можно сверять процесс и анти-слоп правила со своим навыком |
| [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | 73 брендов, MIT, в каждом DESIGN.md плюс HTML-превью | Брать выборочно 4-6 файлов `DESIGN.md` из `design-md/`: Apple (воздух, SF Pro, кинематографичные фото), Tesla и BMW (техника), Linear (точность), Stripe (легкие градиенты), Notion (теплый минимализм). Остальное не качать |
| [kevinbism/liquid-glass-effect](https://github.com/kevinbism/liquid-glass-effect) | 3 файла, чистый CSS, MIT | Прием стекла: `backdrop-filter: blur() saturate(180%)`, полупрозрачный фон, inset-тень, `drop-shadow` на псевдоэлементе. Совпадает с нашим `glass.css` |
| [Mael-667/Liquid-Glass-CSS](https://github.com/Mael-667/Liquid-Glass-CSS) | малая библиотека без зависимостей | Вариант с SVG-фильтром и регулировкой размытия, сравнить с нашей реализацией |

## Смотреть только для понимания (Chromium, тяжелее)

- [nikdelvin/liquid-glass](https://github.com/nikdelvin/liquid-glass): точная имитация iOS 26 через SVG-карты смещения. Работает только в Chromium, в Safari откатывается к размытию. Для статичных слайдов избыточно.

## Не брать (тяжело или не подходит)

- [naughtyduk/liquidGL](https://github.com/naughtyduk/liquidGL): шейдеры WebGL/WebGPU, тяжелый рендер.
- [xjli360/awesome-design-md-ecommerce](https://github.com/xjli360/awesome-design-md-ecommerce): заявлено 1632 бренда, огромная и не про презентации.
- Темы Slidev, Marp, reveal.js: нужна сборка и node-цепочка, а у нас HTML + Playwright уже есть.

## Не проверено (видел только в выдаче поиска)

[bitjaru/styleseed](https://github.com/bitjaru/styleseed), [Owl-Listener/designer-skills](https://github.com/owl-listener/designer-skills),
[wilwaldon/Claude-Code-Frontend-Design-Toolkit](https://github.com/wilwaldon/Claude-Code-Frontend-Design-Toolkit).
Перед использованием открыть и оценить размер и качество.

## Как использовать

1. Не клонировать целиком. Для VoltAgent: `git clone --depth 1 --filter=blob:none --sparse`, затем `git sparse-checkout set design-md/apple design-md/tesla` и т.д.
2. Брать из референса принципы и токены, не копировать чужую идентику.
3. Любой заимствованный прием проходит через `lint-deck.mjs` и проверку глазами.
