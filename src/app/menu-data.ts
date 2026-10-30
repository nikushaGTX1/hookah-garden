export type SectionId = 'hookah' | 'wine' | 'cocktails' | 'tea' | 'food' | 'sweets';

export interface MenuItem {
  name: string;
  desc: string;
  price: number;
  /** Optional second price, e.g. bottle price for wine. */
  price2?: number;
  tag?: string;
  popular?: boolean;
  veg?: boolean;
  /** 1 = light, 2 = medium, 3 = strong. Hookah only. */
  strength?: number;
  img?: string;
  /** Words the assistant matches against, beyond name and description. */
  mood?: string[];
}

export interface MenuSection {
  id: SectionId;
  label: string;
  title: string;
  sub: string;
  banner: string;
  items: MenuItem[];
}

// Line icons drawn on a 24x24 grid, stroke only.
export const ICONS: Record<SectionId | 'all', string> = {
  all: 'M12 3 L15 6 L12 9 L9 6 Z M6 9 L9 12 L6 15 L3 12 Z M18 9 L21 12 L18 15 L15 12 Z M12 15 L15 18 L12 21 L9 18 Z',
  hookah:
    'M9 2 H15 L14 5 H10 Z M6.5 6 H17.5 M11 6 V13 M13 6 V13 M12 13 C7 14 7 20 9 22 H15 C17 20 17 14 12 13 Z M13 11 C18 11 20 15 18.5 18.5',
  wine: 'M8 2 H16 C16 8 15 11 12 11 C9 11 8 8 8 2 Z M12 11 V20 M8 21 H16 M8.4 6 H15.6',
  cocktails: 'M4 4 H20 L12 13 Z M12 13 V20 M8 21 H16 M7.5 8 H16.5 M17 4 L20 1',
  tea: 'M5 9 H17 V14 C17 18 14 20 11 20 C8 20 5 18 5 14 Z M17 11 H18.5 C21 11 21 15 18.5 15 H17 M9 2 C8 4 10 5 9 7 M13 2 C12 4 14 5 13 7',
  food: 'M3 18 H21 M5 18 C5 12 8 9 12 9 C16 9 19 12 19 18 M12 9 V7 M10.5 6 H13.5 M4 21 H20',
  sweets: 'M6 12 H18 L16 21 H8 Z M6 12 C6 8 9 6 12 6 C15 6 18 8 18 12 M12 6 V3 M10 12 L11 21 M14 12 L13 21',
};

export const SECTIONS: MenuSection[] = [
  {
    id: 'hookah',
    label: 'ჩილიმი',
    title: 'ჩილიმი',
    sub: 'საფირმო ნაზავები და კლასიკა',
    banner: 'images/hookahs.jpg',
    items: [
      { name: 'ოქროს ბაღი', tag: 'საფირმო', popular: true, desc: 'ატამი, მანგო და ველური თაფლი ახალ პიტნაზე', price: 45, strength: 1, img: 'images/hookahs.jpg', mood: ['ხილიანი', 'მსუბუქი', 'ტკბილი'] },
      { name: 'შუაღამის ვარდი', tag: 'საფირმო', desc: 'ვარდის ფურცლები, მაყვალი და გრილი მენთოლი', price: 45, strength: 2, mood: ['ყვავილოვანი', 'პიტნიანი', 'გრილი'] },
      { name: 'სულთნის ნაზავი', tag: 'საფირმო', desc: 'ორმაგი ვაშლი, ჰელი და ანისულის ნოტა', price: 50, strength: 3, mood: ['მაგარი', 'ძლიერი', 'სანელებლიანი', 'კლასიკური'] },
      { name: 'უდაბნოს ოაზისი', tag: 'ყინულის შლანგი', desc: 'საზამთრო, ლაიმი და კივი, განსაკუთრებით გრილი', price: 45, strength: 1, img: 'images/watermelon-cooler.jpg', mood: ['ხილიანი', 'პიტნიანი', 'გრილი', 'მსუბუქი'] },
      { name: 'ორმაგი ვაშლი', popular: true, desc: 'ანისულით ტკბილი, ორიგინალი კლასიკა', price: 35, strength: 2, mood: ['კლასიკური'] },
      { name: 'ყურძენი და პიტნა', desc: 'ტკბილი ყურძენი სუფთა დაბოლოებით', price: 35, strength: 1, mood: ['პიტნიანი', 'ხილიანი', 'მსუბუქი'] },
      { name: 'ლიმონი და პიტნა', desc: 'ციტრუსი და გრილი პიტნა', price: 35, strength: 1, mood: ['პიტნიანი', 'მსუბუქი'] },
      { name: 'ხილის თასი', tag: 'დამატება', desc: 'ანანასში, გრეიპფრუტში ან ნესვში', price: 20, mood: ['ხილიანი'] },
    ],
  },
  {
    id: 'wine',
    label: 'ღვინო',
    title: 'ქართული ღვინო',
    sub: 'ჩვენი მარანიდან · ჭიქა / ბოთლი',
    banner: 'images/vineyard-wine.jpg',
    items: [
      { name: 'საფერავი', tag: 'წითელი', popular: true, desc: 'მუქი ხილი, მშრალი', price: 14, price2: 60, img: 'images/wine-toast.jpg', mood: ['წითელი', 'მშრალი', 'მაგარი'] },
      { name: 'ქინძმარაული', tag: 'წითელი', desc: 'ნახევრადტკბილი, რბილი და წვნიანი', price: 14, price2: 60, mood: ['წითელი', 'ტკბილი'] },
      { name: 'წინანდალი', tag: 'თეთრი', desc: 'მშრალი, ხალასი, კურკოვანი ხილი', price: 13, price2: 55, mood: ['თეთრი', 'მსუბუქი', 'ხილიანი'] },
      { name: 'ქისი', tag: 'ქარვისფერი', desc: 'ქვევრის ღვინო, გარგარი და სანელებლები', price: 16, price2: 70, mood: ['ქარვისფერი', 'სანელებლიანი'] },
      { name: 'ცქრიალა ბრუტი', tag: 'ცქრიალა', desc: 'მშრალი და სადღესასწაულო', price: 15, price2: 65, mood: ['ჯგუფი', 'მეგობრები', 'დღესასწაული', 'მსუბუქი'] },
    ],
  },
  {
    id: 'cocktails',
    label: 'კოქტეილები',
    title: 'კოქტეილები',
    sub: 'ბარში შენჯღრეული',
    banner: 'images/cocktails-trio.jpg',
    items: [
      { name: 'Garden სპრიცი', tag: 'საფირმო', popular: true, desc: 'ცქრიალა ღვინო, ანწლის ყვავილი, პიტნა', price: 22, img: 'images/cocktails-trio.jpg', mood: ['მსუბუქი', 'პიტნიანი', 'ხილიანი'] },
      { name: 'ოქროს ოლდ ფეშენდი', desc: 'ვისკი, თაფლი, ფორთოხლის ბიტერი', price: 26, img: 'images/old-fashioned.jpg', mood: ['მაგარი', 'ძლიერი', 'კლასიკური'] },
      { name: 'ბროწეულის მიული', desc: 'არაყი, ბროწეული, ჯანჯაფილის ლუდი', price: 22, img: 'images/cocktail.jpg', mood: ['ხილიანი', 'სანელებლიანი'] },
      { name: 'უალკოჰოლო მოხიტო', tag: '0%', desc: 'ლაიმი, პიტნა, სოდა', price: 14, mood: ['პიტნიანი', 'უალკოჰოლო', 'მსუბუქი'] },
    ],
  },
  {
    id: 'tea',
    label: 'ჩაი',
    title: 'ჩაი და ყავა',
    sub: 'ნელა ჩამოსხმული, გასაზიარებლად',
    banner: 'images/herbal-tea.jpg',
    items: [
      { name: 'მაროკოული პიტნის ჩაი', tag: 'ჩაიდანი', popular: true, desc: 'მწვანე ჩაი და ახალი პიტნა, შაქარი ცალკე', price: 15, img: 'images/mint-tea.jpg', mood: ['პიტნიანი', 'ჯგუფი', 'უალკოჰოლო'] },
      { name: 'შავი ჩაი ჰელით', desc: 'მაგარი და არომატული', price: 10, mood: ['სანელებლიანი', 'უალკოჰოლო'] },
      { name: 'მწვანე ჩაი ჟასმინით', desc: 'ყვავილოვანი და ნაზი', price: 10, mood: ['ყვავილოვანი', 'მსუბუქი', 'უალკოჰოლო'] },
      { name: 'თურქული ყავა', desc: 'რახათ-ლუკუმთან ერთად', price: 9, mood: ['მაგარი', 'უალკოჰოლო'] },
      { name: 'სახლის ლიმონათი', desc: 'ლიმონი, პიტნა, ცოტა თაფლი', price: 12, img: 'images/watermelon-cooler.jpg', mood: ['პიტნიანი', 'მსუბუქი', 'უალკოჰოლო', 'გრილი'] },
    ],
  },
  {
    id: 'food',
    label: 'კერძები',
    title: 'კერძები',
    sub: 'გასაზიარებლად ნაფაზებს შორის',
    banner: 'images/dinner.jpg',
    items: [
      { name: 'მეზეს დაფა', tag: 'გასაზიარებელი', popular: true, veg: true, desc: 'ჰუმუსი, ბაბა განუში, ზეთისხილი, თბილი პიტა', price: 32, img: 'images/hummus.jpg', mood: ['ჯგუფი', 'მეგობრები', 'ვეგეტარიანული'] },
      { name: 'აჭარული ხაჭაპური', veg: true, desc: 'ყველიანი ნავი კარაქითა და კვერცხით', price: 24, img: 'images/khachapuri.jpg', mood: ['ვეგეტარიანული', 'მშიერი', 'საჭმელი'] },
      { name: 'ყველის დაფა', veg: true, desc: 'ადგილობრივი ყველი, ყურძენი, ნიგოზი, თაფლი', price: 30, mood: ['ჯგუფი', 'ვეგეტარიანული', 'ღვინო'] },
      { name: 'ხილის ლანგარი', veg: true, desc: 'სეზონური ხილი მთელი მაგიდისთვის', price: 25, img: 'images/fruit-plate.jpg', mood: ['ჯგუფი', 'ვეგეტარიანული', 'ხილიანი', 'მსუბუქი'] },
    ],
  },
  {
    id: 'sweets',
    label: 'დესერტი',
    title: 'დესერტები',
    sub: 'ტკბილი დასასრული',
    banner: 'images/baklava.jpg',
    items: [
      { name: 'ფისტის ბაქლავა', popular: true, veg: true, desc: 'ფენოვანი ცომი, სიროფი, დაფქული ფისტა', price: 14, img: 'images/baklava.jpg', mood: ['ტკბილი', 'დესერტი', 'ვეგეტარიანული'] },
      { name: 'რახათ-ლუკუმი', veg: true, desc: 'ვარდი და ბროწეული', price: 10, mood: ['ტკბილი', 'დესერტი', 'ყვავილოვანი', 'ვეგეტარიანული'] },
      { name: 'ჩურჩხელა', veg: true, desc: 'ნიგოზი ყურძნის ტკბილში', price: 8, img: 'images/churchkhela.jpg', mood: ['ტკბილი', 'დესერტი', 'ვეგეტარიანული'] },
    ],
  },
];

export const GALLERY = [
  { src: 'images/lounge.jpg', alt: 'თბილი ბარი ჩამოკიდებული ნათურებით' },
  { src: 'images/hookahs.jpg', alt: 'ფერადი ქალიანების რიგი' },
  { src: 'images/mint-tea.jpg', alt: 'ახალი პიტნის ჩაი ჭიქაში' },
  { src: 'images/khachapuri.jpg', alt: 'აჭარული ხაჭაპური კვერცხის გულით' },
  { src: 'images/old-fashioned.jpg', alt: 'ოლდ ფეშენდი ყინულზე' },
  { src: 'images/interior.jpg', alt: 'სადარბაზო მუქი ხითა და რბილი შუქით' },
];
