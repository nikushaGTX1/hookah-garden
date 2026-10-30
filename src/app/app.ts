import { Component, computed, signal } from '@angular/core';
import { GALLERY, ICONS, MenuItem, MenuSection, SECTIONS, SectionId } from './menu-data';

type Category = SectionId | 'all';

interface ViewItem extends MenuItem {
  key: string;
  section: string;
  icon: string;
}

interface ChatMessage {
  from: 'bot' | 'me';
  text: string;
  picks?: ViewItem[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  protected readonly icons = ICONS;
  protected readonly gallery = GALLERY;
  protected readonly strengthNames = ['', 'მსუბუქი', 'საშუალო', 'მაგარი'];
  protected readonly dots = [1, 2, 3];
  protected readonly chips = ['რაღაც ხილიანი და მსუბუქი', 'კოქტეილის შერჩევა', 'საუკეთესო ჯგუფისთვის', 'რაღაც პიტნიანი', 'ვეგეტარიანული საჭმელი', 'უალკოჰოლო'];

  protected readonly sections: (MenuSection & { icon: string; view: ViewItem[] })[] = SECTIONS.map((s) => ({
    ...s,
    icon: ICONS[s.id],
    view: s.items.map((it, i) => ({ ...it, key: `${s.id}-${i}`, section: s.title, icon: ICONS[s.id] })),
  }));

  protected readonly categories: { id: Category; label: string; icon: string }[] = [
    { id: 'all', label: 'ყველა', icon: ICONS.all },
    ...SECTIONS.map((s) => ({ id: s.id, label: s.label, icon: ICONS[s.id] })),
  ];

  private readonly allItems = this.sections.flatMap((s) => s.view);
  protected readonly featured = this.allItems[0];

  protected readonly cat = signal<Category>('all');
  protected readonly query = signal('');
  protected readonly picked = signal<Record<string, number>>({});
  protected readonly sheet = signal<'order' | 'chat' | null>(null);
  protected readonly navOpen = signal(false);
  protected readonly chat = signal<ChatMessage[]>([
    { from: 'bot', text: 'მოგესალმებით Hookah Garden-ში. მითხარით თქვენი განწყობა და ამაღამინდელი მენიუდან რამეს შეგირჩევთ.' },
  ]);

  protected readonly groups = computed(() => {
    const q = this.query().trim().toLowerCase();
    const c = this.cat();
    return this.sections
      .filter((s) => c === 'all' || s.id === c)
      .map((s) => ({
        ...s,
        view: s.view.filter((it) => !q || `${it.name} ${it.desc} ${it.tag ?? ''}`.toLowerCase().includes(q)),
      }))
      .filter((s) => s.view.length > 0);
  });

  protected readonly showFeatured = computed(() => this.cat() === 'all' && !this.query().trim());

  protected readonly orderItems = computed(() => {
    const p = this.picked();
    return this.allItems.filter((it) => p[it.key]).map((it) => ({ ...it, qty: p[it.key] }));
  });
  protected readonly orderCount = computed(() => this.orderItems().reduce((n, it) => n + it.qty, 0));
  protected readonly orderTotal = computed(() => this.orderItems().reduce((n, it) => n + it.qty * it.price, 0));

  protected readonly openNow = this.isOpen(new Date());

  protected pickCat(c: Category): void {
    this.cat.set(c);
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected onSearch(e: Event): void {
    this.query.set((e.target as HTMLInputElement).value);
  }

  protected isPicked(key: string): boolean {
    return !!this.picked()[key];
  }

  protected toggle(key: string): void {
    this.picked.update((p) => {
      const next = { ...p };
      if (next[key]) delete next[key];
      else next[key] = 1;
      return next;
    });
  }

  protected changeQty(key: string, delta: number): void {
    this.picked.update((p) => {
      const next = { ...p };
      const qty = (next[key] ?? 0) + delta;
      if (qty <= 0) delete next[key];
      else next[key] = qty;
      return next;
    });
  }

  protected clearOrder(): void {
    this.picked.set({});
  }

  protected ask(text: string): void {
    const q = text.trim();
    if (!q) return;
    const picks = this.recommend(q);
    const reply = picks.length
      ? 'აი, რას მოგიტანდით მაგიდასთან:'
      : 'ვერაფერი მოვძებნე — სცადეთ განწყობა: ხილიანი, პიტნიანი, მაგარი, ტკბილი ან ვეგეტარიანული.';
    this.chat.update((m) => [...m, { from: 'me', text: q }, { from: 'bot', text: reply, picks }]);
    setTimeout(() => {
      const log = document.getElementById('chat-log');
      log?.scrollTo({ top: log.scrollHeight, behavior: 'smooth' });
    });
  }

  protected send(input: HTMLInputElement, e: Event): void {
    e.preventDefault();
    this.ask(input.value);
    input.value = '';
  }

  /**
   * Scores items by word overlap with name, description and mood tags; picks one hookah plus one drink or food.
   * Georgian words inflect heavily, so two words match when their first four letters agree.
   */
  private recommend(q: string): ViewItem[] {
    const tokens = (s: string) => s.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 2);
    const stem = (w: string) => w.slice(0, 4);
    const terms = tokens(q).map(stem);
    const score = (it: ViewItem) => {
      const hay = new Set(tokens(`${it.name} ${it.desc} ${it.tag ?? ''} ${(it.mood ?? []).join(' ')} ${it.section}`).map(stem));
      return terms.reduce((n, t) => n + (hay.has(t) ? 1 : 0), 0) + (it.popular ? 0.1 : 0);
    };
    const ranked = this.allItems.map((it) => ({ it, s: score(it) })).filter((r) => r.s >= 1).sort((a, b) => b.s - a.s);
    const hookah = ranked.find((r) => r.it.key.startsWith('hookah'));
    const other = ranked.find((r) => !r.it.key.startsWith('hookah'));
    return [hookah, other, ...ranked]
      .filter((r): r is { it: ViewItem; s: number } => !!r)
      .map((r) => r.it)
      .filter((it, i, a) => a.indexOf(it) === i)
      .slice(0, 3);
  }

  private isOpen(d: Date): boolean {
    // Open 14:00–02:00 daily.
    const h = d.getHours();
    return h >= 14 || h < 2;
  }
}
