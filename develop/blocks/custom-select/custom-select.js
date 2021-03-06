class CustomSelect {
    /**
     * @param {HTMLElement} select
     * @param {Object} options
     * @param {Function} options.onSelect - callback for selected element
     */

    constructor(select, options = {}) {
        if (!select) {
            throw new Error('No element has been passed');
        }
        this.select = select;
        this.options = options;

        this.setup();
    }

    setup() {
        this.valueInput = this.select.querySelector('.custom-select__value');
        this.selected = this.select.querySelector('.custom-select__selected');
        this.dropdown = this.select.querySelector('.custom-select__dropdown');
        this.optionsList = this.select.querySelector('.custom-select__options');

        this.inititalPlaceholder = this.selected.textContent.trim();

        new SimpleBar(this.dropdown, {
            autoHide: false,
        });

        /** keycodes */
        this.keyCodes = {
            enter: 13,
            down_arrow: 40,
            up_arrow: 38,
            escape: 27,
        };

        this.setEventHandlers();
    }

    setEventHandlers() {
        this.selected.addEventListener('keydown', (e) => this.toggleOptionsList(e));
        this.selected.addEventListener('click', (e) => this.toggleOptionsList(e));

        this.optionsList.addEventListener('click', (e) => {
            const target = e.target;

            if (target.classList.contains('custom-select__option')) {
                e.preventDefault();
                this.selectItem(e);
            }
        });

        this.optionsList.addEventListener('keydown', (e) => {
            const target = e.target;

            if (target.classList.contains('custom-select__option')) {
                switch (e.keyCode) {
                    case this.keyCodes.enter:
                        this.selectItem(e);

                        return;

                    case this.keyCodes.down_arrow:
                        e.preventDefault();

                        this.focusNextListItem(this.keyCodes.down_arrow);
                        return;

                    case this.keyCodes.up_arrow:
                        e.preventDefault();

                        this.focusNextListItem(this.keyCodes.up_arrow);
                        return;

                    case this.keyCodes.escape:
                        this.closeOptionsList();
                        return;

                    default:
                        return;
                }
            }
        });

        document.addEventListener('click', (e) => {
            if (!this.select.contains(e.target) && this.dropdown.classList.contains('opened')) {
                this.closeOptionsList();
            }
        });
    }

    toggleOptionsList(e) {
        if (e.keyCode === this.keyCodes.escape) {
            this.closeOptionsList();
        }

        if (e.type === 'click') {
            this.dropdown.classList.toggle('opened');
            this.selected.classList.toggle('opened');

            this.dropdown.setAttribute('aria-expanded', this.dropdown.classList.contains('opened'));
            // $$.fadeToggle(this.dropdown);
            $(this.dropdown).fadeToggle(120);
        }

        if (e.keyCode === this.keyCodes.down_arrow) {
            e.preventDefault();

            this.focusNextListItem(this.keyCodes.down_arrow);
        }

        if (e.keyCode === this.keyCodes.up_arrow) {
            e.preventDefault();

            this.focusNextListItem(this.keyCodes.up_arrow);
        }
    }

    closeOptionsList() {
        this.dropdown.classList.remove('opened');
        this.selected.classList.remove('opened');
        this.dropdown.setAttribute('aria-expanded', false);
        // $$.fadeOut(this.dropdown);
        $(this.dropdown).fadeOut(120);
    }

    focusNextListItem(direction) {
        const activeElement = document.activeElement;
        const options = [...this.optionsList.children];
        if (activeElement.classList.contains('custom-select__selected')) {
            this.optionsList.children[0].focus();
        } else {
            const currentActiveElementIndex = options.indexOf(activeElement);
            if (direction === this.keyCodes.down_arrow) {
                const currentActiveElementIsNotLastItem = currentActiveElementIndex < options.length - 1;
                if (currentActiveElementIsNotLastItem) {
                    const nextListItem = options[currentActiveElementIndex + 1];

                    nextListItem.focus();
                }
            } else if (direction === this.keyCodes.up_arrow) {
                const currentActiveElementIsNotFirstItem = currentActiveElementIndex > 0;
                if (currentActiveElementIsNotFirstItem) {
                    const nextListItem = options[currentActiveElementIndex - 1];
                    nextListItem.focus();
                }
            }
        }
    }

    selectItem(e) {
        const selectedValue = e.target.textContent.trim();
        this.singleSelectLogic(e, selectedValue);
    }

    setSelected(value) {
        this.selected.textContent = value;

        if (this.valueInput) this.valueInput.value = value;
    }

    clearSelected() {
        this.selected.textContent = this.inititalPlaceholder;
        if (this.valueInput) {
            this.valueInput.value = null;
        }
    }

    singleSelectLogic(e, selectedValue) {
        /** clicked item was already selected */
        if (this.selected.textContent === selectedValue) {
            this.closeOptionsList();
            return;
        }

        this.selected.textContent = selectedValue;

        if (this.valueInput) this.valueInput.value = selectedValue;
        this.closeOptionsList();

        if (typeof this.options.onSelect === 'function') {
            this.options.onSelect(selectedValue);
        }
    }
}

(function () {
    const selects = document.querySelectorAll('.custom-select');
    selects.forEach((select) => new CustomSelect(select));
})();
