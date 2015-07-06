# Magento checkout history experiment

Experiment to see if it's possible for browser back button to take you to previous checkout step on Magento Onepage checkout. 

This is just an experiment, nothing more, repo exists for backup purposes only. 

[Wiki Info](https://github.com/ivanweiler/magento-checkout-history-experiment/wiki)

## How

Include opcheckout_history.js after opcheckout.js, usually in onepage.phtml template file:

```html
<script type="text/javascript" src="<?php echo $this->getSkinUrl('js/opcheckout_history.js') ?>"></script>
```

(why this isn't in layout is beyond me :)
