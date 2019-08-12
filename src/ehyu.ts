const onset = [
    "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ",
    "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
    "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ",
    "ㅋ", "ㅌ", "ㅍ", "ㅎ"
  ];
const nucleus = [
    "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ",
    "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ",
    "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ",
    "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ",
    "ㅣ"
  ];
const coda = [
    "", "ㄱ", "ㄲ", "ㄳ", "ㄴ",
    "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ",
    "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ",
    "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ",
    "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ",
    "ㅌ", "ㅍ", "ㅎ"
  ];

type syllableType = "onset" | "nucleus" | "coda";
interface RuleOption{
    target?: syllableType;
    lock?: boolean;
}
class Rule{
    from: string;
    to: string;
    setup: RuleOption;
    constructor(from: string, to: string, setup?: RuleOption){
        this.from = from;
        this.to = to;
        this.setup = setup || {};
    }
    apply(val: Array<Glja>){
        return val.map((glja: Glja) => {
            if(this.setup.target){
                this.change(glja, this.setup.target);
            }else{
                this.change(glja, "onset");
                this.change(glja, "nucleus");
                this.change(glja, "coda");
            }
            return glja;
        });
    }
    private change(glja: Glja, target: syllableType) {
        if (glja[target] == this.from) {
            glja[target] = this.to;
            if(this.setup.lock){
                glja.lock(target);
            }
        }
    }
}
class Glja{
    private _onset: string;
    private _nucleus: string;
    private _coda: string;
    private _char: string;
    isLocked: {
        onset: boolean;
        nucleus: boolean;
        coda: boolean;
    };
    constructor(char: string){
        this.isLocked = {
            onset: false,
            nucleus: false,
            coda: false
        }
        this._char = char;
        this.genSyllable(char);
    }
    private genSyllable(char: string) {
        if(this.isHangul){
            this.onset = onset[~~((char.charCodeAt(0) - 44032) / 28 / 21)];
            this.nucleus = nucleus[~~((char.charCodeAt(0) - 44032) / 28 % 21)];
            this.coda = coda[(char.charCodeAt(0) - 44032) % 28];
        }
    }
    get onset(): string{ return this._onset; }
    set onset(val: string){
        if(!this.isLocked.onset){
            this._onset = val;
        }
    }
    get nucleus(): string{ return this._nucleus; }
    set nucleus(val: string){
        if(!this.isLocked.nucleus){
            this._nucleus = val;
        }
    }
    get coda(): string{ return this._coda; }
    set coda(val: string){
        if(!this.isLocked.coda){
            this._coda = val;
        }
    }
    get char(): string{
        if(this.isHangul){
            var onsetIndex: number = onset.indexOf(this.onset);
            var nucleusIndex: number = nucleus.indexOf(this.nucleus);
            var codaIndex: number = coda.indexOf(this.coda);
            return String.fromCharCode( 44032 + onsetIndex * 28 * 21 + nucleusIndex * 28 + codaIndex );
        }else{
            return this._char;
        }
    }
    set char(char: string){
        this.genSyllable(char);
        this._char = char;
    }
    get isHangul(): boolean {
        return /[가-힣]/.test(this._char);
    }
    lock(val: syllableType){
        this.isLocked[val] = true;
    }
}
class Gljas{
    originContent: Array<Glja>;
    rules: Array<Rule>;
    constructor(content: string){
        this.originContent = content.split("").map((val: string) => new Glja(val));
        this.rules = [];
    }
    replace(from: string, to: string, setup?: RuleOption){
        this.rules.push(new Rule(from, to, setup));
        return this;
    }
    get content(): string{
        return this.rules.reduce((acc, now) => now.apply(acc), this.originContent).map((val: Glja) => val.char).join("");
    }
}

export {Gljas};