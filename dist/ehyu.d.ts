declare type syllableType = "onset" | "nucleus" | "coda";
interface RuleOption {
    target?: syllableType;
    lock?: boolean;
}
declare class Rule {
    from: string;
    to: string;
    setup: RuleOption;
    constructor(from: string, to: string, setup?: RuleOption);
    apply(val: Array<Glja>): Glja[];
    private change;
}
declare class Glja {
    private _onset;
    private _nucleus;
    private _coda;
    private _char;
    isLocked: {
        onset: boolean;
        nucleus: boolean;
        coda: boolean;
    };
    constructor(char: string);
    private genSyllable;
    onset: string;
    nucleus: string;
    coda: string;
    char: string;
    readonly isHangul: boolean;
    lock(val: syllableType): void;
}
declare class Gljas {
    originContent: Array<Glja>;
    rules: Array<Rule>;
    constructor(content: string);
    replace(from: string, to: string, setup?: RuleOption): this;
    readonly content: string;
}
export { Gljas };
